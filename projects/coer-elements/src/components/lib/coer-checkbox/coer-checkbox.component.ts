import { AfterViewInit, Component, computed, Input, input, output } from '@angular/core';
import { CONTROL_VALUE, ControlValue } from '../../../tools/lib/control-value.class';
import { Tools } from '../../../tools/lib/tools';

@Component({
    selector: 'coer-checkbox',
    templateUrl: './coer-checkbox.component.html',
    styleUrl: './coer-checkbox.component.scss',
    providers: [CONTROL_VALUE(CoerCheckbox)],
})
export class CoerCheckbox extends ControlValue implements AfterViewInit {

    //Variables
    public override _value: boolean = false;
    protected _id: string = Tools.GetGuid('coer-checkbox');
    private _isLoading: boolean = true;

    //Inputs
    @Input() set value(value: boolean | null | undefined) {
        if(Tools.IsNull(value)) value = false;
        this.SetValue(value as boolean);
    }

    public id = input<string>('');
    public label = input<string>('');
    public labelPosition = input<'before' | 'after'>('after');
    public isDisabled = input<boolean>(false);
    public isLoading = input<boolean>(false);
    public isInvisible = input<boolean>(false);
    public ignoreModel = input<boolean>(false);

    //Outputs
    public onChange = output<boolean>();

    //getter
    public get value() {
        return this._value;
    }

    //computed
    protected _isEnable = computed<boolean>(() => {
        return !this.isLoading() && !this.isDisabled() && !this.isInvisible();
    });


    ngAfterViewInit() {
        Tools.Sleep().then(_ => this._isLoading = false);
    }


    //ControlValueAccessor
    public override SetValue(value: boolean): void {
        if(Tools.IsNotNull(value)) {
            if(!this.ignoreModel()) {
                this._UpdateValue(value);
            }

            this._value = value;

            if (!this._isLoading && this._isEnable()) {
                this.onChange.emit(value);
            }
        }
    }


    //ControlValueAccessor
    public override writeValue(value: boolean): void {
        if(Tools.IsNotNull(value)) {
            this._value = value;

            if (!this._isLoading && this._isEnable()) {
                this.onChange.emit(value);
            }
        }
    }


    /** */
    public Check(): void {
        if (!this._isLoading && this._isEnable()) {
            this.SetValue(true);
        }
    }


    /** */
    public Uncheck(): void {
        if (!this._isLoading && this._isEnable()) {
            this.SetValue(false);
        }
    }
}