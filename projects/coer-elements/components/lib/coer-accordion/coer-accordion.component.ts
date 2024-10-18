import { Component, input, Input, viewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Tools } from 'coer-elements/tools'
@Component({
    selector: 'coer-accordion',
    templateUrl: './coer-accordion.component.html',
    styleUrl: './coer-accordion.component.scss',
})
export class CoerAccordion {

    //Variables
    protected _id: string = Tools.GetGuid('coer-accordion');
    private _expansionPanel = viewChild<MatExpansionPanel>('coerAccordion');

    //Inputs
    @Input() id: string = '';
    public title = input<string>('');
    public icon = input<string>('');
    public expanded = input<boolean>(true);


    //Generic Tools
    protected IsNotOnlyWhiteSpace = Tools.IsNotOnlyWhiteSpace;


    public get isExpanded(): boolean {
        return Tools.IsNotNull(this._expansionPanel())
            ? this._expansionPanel()!.expanded
            : false;
    }


    public get isCollapsed(): boolean {
        return Tools.IsNotNull(this._expansionPanel())
            ? !this._expansionPanel()!.expanded
            : true;
    }


    /** */
    public Open(): void {
        if(Tools.IsNotNull(this._expansionPanel())) {
            if(this.isCollapsed) {
                this._expansionPanel()?.open();
            }

        }
    }


    /** */
    public Close(): void {
        if(Tools.IsNotNull(this._expansionPanel())) {
            if(this.isExpanded) {
                this._expansionPanel()?.close();
            }
        }
    }
}