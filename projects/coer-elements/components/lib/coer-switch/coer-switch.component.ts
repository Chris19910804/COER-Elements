import { Component, computed, input, Input, OnDestroy, OnInit, output, ViewChild } from '@angular/core';
import { MatSlideToggle } from '@angular/material/slide-toggle'; 
import { CONTROL_VALUE, ControlValue, Tools } from 'coer-elements/tools';
import { Tooltip } from 'bootstrap';

@Component({
    selector: 'coer-switch',
    templateUrl: './coer-switch.component.html',
    styleUrl: './coer-switch.component.scss',
    providers: [CONTROL_VALUE(CoerSwitch)],
})
export class CoerSwitch extends ControlValue implements OnInit, OnDestroy {

    //Variables
    protected override _value: boolean = false;
    protected _id: string = Tools.GetGuid('coer-switch');
    private _tooltip: string = '';
    private _tooltipElement!: Tooltip;

    @ViewChild('coerSwitch') coerSwitch!: MatSlideToggle;

    //Inputs
    @Input() public set value(value: boolean | null | undefined) {
        if(Tools.IsNull(value)) value = false;
        this.SetValue(value);
    }

    @Input() id: string = '';
    public label = input<string>('');
    public labelPosition = input<'before' | 'after'>('after');
    public isDisabled = input<boolean>(false);
    public isLoading = input<boolean>(false);
    public isInvisible = input<boolean>(false);
    public tooltipPosition = input<'top' | 'right' | 'bottom' | 'left'>('top');

    @Input() set tooltip(value: string) {
        this._tooltip = value;
        if (value && this._tooltipElement) {
            this._tooltipElement.setContent({ '.tooltip-inner': this._tooltip });
        }
    }


    //Outputs
    public onChange = output<boolean>();


    ngOnInit() {
        Tools.Sleep().then(() => {
            const htmlElement = document.getElementById(this._id)!;

            if (htmlElement) {
                htmlElement.addEventListener('mouseleave', () => {
                    if (this._tooltipElement) this._tooltipElement.hide()
                });

                this._tooltipElement = new Tooltip(htmlElement, {
                    html: true,
                    title: this._tooltip,
                    placement: this.tooltipPosition()
                });
            }
        });
    }

    ngOnDestroy() {
        if (this._tooltipElement) {
            Tools.Sleep().then(() => this._tooltipElement.dispose());
        }
    }


    //getter
    public get value() {
        return this._value;
    }


    //conmputed
    protected _isEnable = computed<boolean>(() => {
        return !this.isLoading() && !this.isDisabled() && !this.isInvisible();
    });


    /** */
    public Focus(): void {
        Tools.Sleep().then(() => {
            if(this._isEnable()) this.coerSwitch.focus();
        });
    }


    /** */
    protected Change(value: boolean): void {
        this.SetValue(value);
        this.onChange.emit(value);
    }
}