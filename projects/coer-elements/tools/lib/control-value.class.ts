import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { forwardRef } from "@angular/core";

export const CONTROL_VALUE = <T>(component: T) => {
    return {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => component),
        multi: true
    }
}


export class ControlValue implements ControlValueAccessor {

    //Variables
    protected _value: any;
    private _isTouched: boolean = false;
    protected _UpdateValue!: Function;
    private _IsTouched!: Function;


    public get isTouched() {
        return this._isTouched;
    }


    /** */
    protected SetValue(value: any): void {
        if(typeof this._UpdateValue === 'function') {
            this._UpdateValue(value);
        }

        this._value = value;
    }


    /** */
    public SetTouched(isTouched: boolean): void {
        if(typeof this._IsTouched === 'function') {
            this._IsTouched(isTouched);
        }

        this._isTouched = isTouched;
    }


    /** */
    public writeValue(value: any): void {
        this._value = value;
    }


    /** */
    public registerOnChange(callback: Function): void {
        this._UpdateValue = callback;
    }


    /** */
    public registerOnTouched(callback: Function): void {
        this._IsTouched = callback;
    }

    
    /** */
    public setDisabledState(isDisabled: boolean): void {}
}