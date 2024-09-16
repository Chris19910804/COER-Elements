import { Component, ContentChildren, Input, input, OnInit, output, viewChild, computed, OnDestroy } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { CoerRefDirective } from '../../../directives/lib/coer-ref.directive';
import { Tools } from '../../../tools/lib/tools';
import { ICoerRef } from '../../../interfaces';
import { Tooltip } from 'bootstrap';

@Component({
    selector: 'coer-tab',
    templateUrl: './coer-tab.component.html',
    styleUrl: './coer-tab.component.scss'
})
export class CoerTab implements OnInit, OnDestroy {

    @ContentChildren(CoerRefDirective) contentRef!: any;

    //Variables
    protected _id: string = Tools.GetGuid('coer-tab');
    protected _selectedIndex: number = 0;
    private _matTabGroup!: HTMLElement;
    protected matTabGroup = viewChild.required<MatTabGroup>('matTabGroup');
    private _tooltipList: { id: string, tooltip?: Tooltip }[] = [];

    //Inputs
    public height = input<string>('auto');
    public minHeight = input<string>('300px');
    public maxHeight = input<string>('auto');

    @Input() set selectedIndex(value: number) {
        if (Tools.IsNotNull(value)) {
            this._selectedIndex = value;
        }
    }

    @Input() set alignTabs(value: 'start' | 'center' | 'end') {
        if(Tools.IsNotNull(this._matTabGroup)) {
            if (Tools.IsNotNull(value)) {
                this._matTabGroup.removeAttribute('mat-align-tabs');

                Tools.Sleep().then(() => {
                    this._matTabGroup.setAttribute('mat-align-tabs', value);
                });
            }
        }

        else Tools.Sleep().then(() => this.alignTabs = value);
    }

    //Computed
    protected contentList = computed<ICoerRef[]>(() => Array.from(this.contentRef._results));

    //Outputs
    public onSelectedTab = output<ICoerRef>();

    ngOnInit() {
        this._matTabGroup = this.matTabGroup()._elementRef.nativeElement;
    }

    ngOnDestroy() {
        for(const _tooltip of this._tooltipList) {
            _tooltip.tooltip?.dispose();
        }
    }

    /** */
    protected SelectedIndexChange(selectedIndex: number) {
        this._selectedIndex = selectedIndex;
        this.onSelectedTab.emit(this.contentList()[selectedIndex]);
    }


    /** */
    protected GetTitle(tab: ICoerRef): string {
        const ref = this.contentList().find(x => x.coerRef() == tab.coerRef())!;
        return (ref.title().length > 0) ? ref.title() : ref.coerRef();
    }


    /** */
    protected GetIcon(tab: ICoerRef): string {
        return this.contentList().find(x => x.coerRef() == tab.coerRef())!.icon();
    }


    /** */
    public SelectTabBy(callback: (tab: ICoerRef) => boolean): void {
        const index = this.contentList().findIndex(callback as any);
        if(index >= 0) this._selectedIndex = index;
    }


    /** */
    protected SetToolTip(tab: ICoerRef): string {
        const id = `${this._id}-${tab.coerRef()}`;

        if (!this._tooltipList.some(x => x.id == id) && tab.tooltip().length > 0) {
            this._tooltipList.push({ id });

            Tools.Sleep().then(() => {
                const htmlElement = document.getElementById(id)!;

                if (htmlElement) {
                    const tooltip = new Tooltip(htmlElement, {
                        html: true,
                        title: tab.tooltip(),
                        placement: 'top'
                    });

                    htmlElement.addEventListener('mouseleave', () => {
                        if (htmlElement) tooltip.hide();
                    });

                    const index = this._tooltipList.findIndex(x => x.id == id);
                    if (index >= 0) this._tooltipList[index].tooltip = tooltip;
                }
            });
        }

        return id;
    }


    /** */
    protected RemoveTooltip(element: HTMLElement): void {
        const id = element.getAttribute('id');
        const index = this._tooltipList.findIndex(x => x.id == id);
        if (index >= 0) this._tooltipList.splice(index, 1);
    }
}