import { Component, computed, ContentChildren, input, Input, OnInit, output, WritableSignal } from '@angular/core';
import { ICoerRef, IScreenSize } from 'coer-elements/interfaces';
import { CoerRefDirective } from 'coer-elements/directives';
import { isModalOpenSIGNAL } from 'coer-elements/signals';
import { Screen, Tools } from 'coer-elements/tools';
import { Modal } from 'bootstrap';


@Component({
    selector: 'coer-modal',
    templateUrl: './coer-modal.component.html',
    styleUrl: './coer-modal.component.scss'
})
export class CoerModal implements OnInit {

    @ContentChildren(CoerRefDirective) contentRef!: any;

    //Variables
    protected _id: string = Tools.GetGuid('coer-modal');
    protected _isOpen: boolean = false;
    protected _modal!: Modal;
    protected _isModalOpen: WritableSignal<boolean> = isModalOpenSIGNAL;
    private windowWidth: number = Screen.WINDOW_WIDTH;

    //Inputs
    @Input() id: string = '';
    public title = input<string>('');
    public icon = input<string>('');
    public showCloseButton = input<boolean>(true);
    public width = input<'small'| 'full'>('small');
    public height = input<string>('auto');
    public maxHeight = input<string>('');

    //getter
    public get isOpen(): boolean {
        return this._isOpen;
    }

    //getter
    protected get _width(): string {
        switch(this.width()) {
            case 'small': return '450px';
            case 'full': return `${this.windowWidth - 50}px`;
            default: return 'auto';
        }
    }

    //Computed
    protected contentList = computed<ICoerRef[]>(() => Array.from(this.contentRef._results));

    //Computed
    protected header = computed<ICoerRef | null>(() => {
        const header = this.contentList().find(x => x.coerRef() === 'header');
        return Tools.IsNotNull(header) ? header! : null;
    });

    //Computed
    protected body = computed<ICoerRef | null>(() => {
        const body = this.contentList().find(x => x.coerRef() === '' || x.coerRef() === 'body');
        return Tools.IsNotNull(body) ? body! : null;
    });

    //Computed
    protected footer = computed<ICoerRef | null>(() => {
        const footer = this.contentList().find(x => x.coerRef() === 'footer');
        return Tools.IsNotNull(footer) ? footer! : null;
    });

    //Computed
    protected _title = computed<string>(() => {
        return Tools.IsNotNull(this.header()) && this.header()!.title().length > 0
            ? this.header()!.title() : this.title();
    });

    //Computed
    protected _icon = computed<string>(() => {
        return Tools.IsNotNull(this.header()) && this.header()!.icon().length > 0
            ? this.header()!.icon() : this.icon();
    });

    //Outputs
    public onOpen = output<void>();
    public onClose = output<void>();

    //Generic Tools
    protected IsNull = Tools.IsNull;
    protected IsNotNull = Tools.IsNotNull;

    ngOnInit() {
        Screen.Resize.subscribe((response: IScreenSize) => {
            this.windowWidth = response.width;
        });

        Tools.Sleep().then(() => {
            this._modal = new Modal(document.getElementById(this._id)!)
        });
    }


    /** */
    public Open(): void {
        this._modal.show();

        if(!this._isOpen) {
            this._isOpen = true;
            this._isModalOpen.set(true);
            Tools.Sleep(1000).then(() => this.onOpen.emit());
        }
    }


    /** */
    public Close(): void {
        this._modal.hide();

        if(this._isOpen) {
            this._isOpen = false;
            this._isModalOpen.set(false);
            Tools.Sleep(1000).then(() => this.onClose.emit());
        }
    }
}