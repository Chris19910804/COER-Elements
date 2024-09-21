import { Component, inject, input } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms'; 
import { CoerAlert, Tools } from 'coer-elements/tools';

@Component({
    selector: 'coer-form',
    templateUrl: './coer-form.component.html',
    styleUrl: './coer-form.component.scss'
})
export class CoerForm {

    //Injection
    private alert = inject(CoerAlert);

    public formGroup = input.required<FormGroup>();
    public isLoading = input<boolean>(false);
    public isDisabled = input<boolean>(false);


    protected get _isDisabled() {
        return this.isLoading() || this.isDisabled();
    }


    /** */
    public TouchForm(): void {
        this.formGroup().markAllAsTouched();
    }


    /** */
    public IsInvalidControl = (formControlName: string): boolean => {
        return Tools.IsNotNull(this.formGroup().get(formControlName))
            ? (this.formGroup().get(formControlName)!.touched && this.formGroup().get(formControlName)!.invalid)
            : true;
    }


    /** */
    public SetControlValue(formControlName: string, value: any): void {
        if (Tools.IsNotNull(this.formGroup().get(formControlName))) {
            this.formGroup().get(formControlName)!.setValue(value);
        }

        else {
            this.alert.Warning(`${formControlName} Control`, 'Not Found');
        }
    }


    /** */
    public GetControlValue(formControlName: string): any {
        return Tools.IsNotNull(this.formGroup().get(formControlName))
            ? this.formGroup().get(formControlName)!.value
            : null;
    }


    /** Get form value */
    public GetValue<T>(): T {
        return Tools.BreakReference(this.formGroup().value);
    }


    /** */
    public Reset<T>(properties: T | null = null): void {
        if (Tools.IsNull(properties)) this.formGroup().reset();
        else this.formGroup().reset(properties);
    }


    /**
     * Mark all controls as touched.
     * If form is invalid emit a warning and focus first invalid control.
    */
    public IsValid(): { isValid: boolean, formValue: any } {
        this.TouchForm();

        if (this.formGroup().invalid) {
            this.alert.Warning('Please complete the required fields', 'Instructions', 'fa-solid fa-list-check');
            this.Focus();
        }

        return {
            isValid: this.formGroup().valid,
            formValue: this.GetValue()
        };
    }


    /** Focus the especified control or first invalid control */
    public Focus(formControl: string | null = null): void {
        const formControlCollection = new Map<string, Element>();
        const formControlErrorCollection = new Map<string, ValidationErrors | null>();

        for(const property of Tools.GetObjectProperties(this.formGroup().controls)) {
            formControlErrorCollection.set(property, this.formGroup().controls[property].errors);
            const htmlElement = document.querySelector(`[formcontrolname='${property}'] input`)
            if(Tools.IsNotNull(htmlElement)) formControlCollection.set(property, htmlElement!);
        }

        if(formControlCollection.size > 0) {
            if(Tools.IsNull(formControl)) {
                for(const [property, error] of formControlErrorCollection) {
                    if (Tools.IsNotNull(error)) {
                        formControl = property;
                        break;
                    }
                }

                if(Tools.IsNull(formControl)) {
                    formControl = Array.from(formControlCollection.keys())[0];
                }
            }

            const element: any = formControlCollection.get(formControl!);
            if(Tools.IsNotNull(element)) element.focus();
        }
    }
}