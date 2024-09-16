import { Component, computed, ElementRef, inject, Input, input, OnInit, output, signal, viewChild } from '@angular/core';
import { CoerAlert } from '../../lib/coer-alert/coer-alert.component';
import { CONTROL_VALUE, ControlValue } from '../../../tools/lib/control-value.class';
import { Tools } from '../../../tools/lib/tools';

@Component({
    selector: 'coer-numberbox',
    templateUrl: './coer-numberbox.component.html',
    styleUrl: './coer-numberbox.component.scss',
    providers: [CONTROL_VALUE(CoerNumberBox)]
})
export class CoerNumberBox extends ControlValue implements OnInit {

    //Injections
    protected readonly alert = inject(CoerAlert);

    //Component Value
    public override _value: string | number = '';
    protected matFormField = viewChild.required<ElementRef>('matFormField');
    protected coerNumberbox = viewChild.required<ElementRef>('coerNumberbox');

    //Variables
    protected _id: string = Tools.GetGuid('coer-numberbox');
    protected _isLoadingEvent = signal<boolean>(false);
    private element!: HTMLInputElement;
    protected hideCaret: boolean = false;

    //Inputs
    @Input() set value(value: number | string | null | undefined) {
        if(Tools.IsNull(value)) value = 0;
        this.SetValue(value as string);
    }

    @Input() id: string = '';
    public label = input<string>('');
    public placeholder = input<string>('');
    public min = input<number>(0);
    public max = input<number>(2147483647);
    public decimals = input<number>(0);
    public width = input<string>('100%');
    public minWidth = input<string>('190px');
    public maxWidth = input<string>('100%');
    public marginTop = input<string>('0px');
    public marginRight = input<string>('0px');
    public marginBottom = input<string>('0px');
    public marginLeft = input<string>('0px');
    public isInvalid = input<boolean>(false);
    public isValid = input<boolean>(false);
    public isDisabled = input<boolean>(false);
    public isReadonly = input<boolean>(false);
    public isLoading = input<boolean>(false);
    public selectOnFocus = input<boolean>(true);
    public textPosition = input<'left' | 'center' | 'right'>('right');

    //Outputs
    public onKeyupEnter = output<string | number>();
    public onInput = output<string | number>();

    ngOnInit() {
        Tools.Sleep().then(() => {
            this.element = document.getElementById(this._id)! as HTMLInputElement;

            if (this.element) {
                this.element.addEventListener('focus', () => {
                    if (!this._isEnable()) this.Blur();
                    else if (this.selectOnFocus()) this.Select();
                });

                this.element.addEventListener('blur', () => this.Blur());

                this.element.addEventListener('keyup', (event: KeyboardEvent) => {
                    if (this._isEnable()) {
                        const { key } = event;

                        if (key === 'Enter') {
                            let value = this.coerNumberbox().nativeElement.value;
                            value = this.OnlyNumbers(value);
                            value = this.ValidateRangeValue(value);
                            this.onKeyupEnter.emit(value);
                            this.Blur();
                        }

                        if (key === 'ArrowUp') {
                            this.hideCaret = true;
                            this.SetValue(Number(this._value) + 1);
                            Tools.Sleep(500, 'ArrowUp').then(() => this.hideCaret = false);
                        }

                        if (key === 'ArrowDown') {
                            this.hideCaret = true;
                            this.SetValue(Number(this._value) - 1);
                            Tools.Sleep(500, 'ArrowDown').then(() => this.hideCaret = false);
                        }
                    }
                });

                this.element.addEventListener('input', () => {
                    Tools.Sleep().then(() => {
                        let value = this.coerNumberbox().nativeElement.value;
                        value = this.OnlyNumbers(value);
                        value = this.ValidateRangeValue(value);
                        if (this._isEnable()) this.onInput.emit(value);
                    });
                });
            }
        });
    }

    //getter
    public get value() {
        return this._value;
    }

    //computed
    protected _isEnable = computed<boolean>(() => {
        return !this.isDisabled() && !this.isLoading() && !this.isReadonly();
    });

    //computed
    protected floatLabel = computed<'auto' | 'always'>(() => {
        return this.label() == '' ? 'always' : 'auto'
    });

    //computed
    protected paddingRight = computed(() => {
        return this.isInvalid() || this.isValid()
            ? '18px' : '0px';
    });

    //ControlValueAccessor
    public override SetValue(value: string | number): void {
        value = this.OnlyNumbers(value);
        value = this.ValidateRangeValue(value);
        this._UpdateValue(value);
        this.coerNumberbox().nativeElement.value = value;
        this._value = value;
    }


    //ControlValueAccessor
    public override writeValue(value: string | number): void {
        value = this.OnlyNumbers(value);
        value = this.ValidateRangeValue(value);
        this.coerNumberbox().nativeElement.value = value;
        this._value = value;
    }


    /** */
    private OnlyNumbers(value: string | number): string | number {
        let isNegative = false;
        let valueString = String(value).trim();

        //Negatives
        if (valueString.includes('-')) {
            if (this.min() < 0) {
                isNegative = valueString.startsWith('-');
                if (valueString == '-') return '-';
                if (valueString == '-.') return '-0.';
                if (valueString == '-0') return '-0';
                if (valueString == '-0.') return '-0.';
            }

            else if(Number(value) < this.min()) {
                this.alert.Warning(`Minimum ${this.min()}`, 'Out of range', 'fa-solid fa-hashtag');
                valueString = '0';
            }
        }

        const charArray = [];
        for (const char of valueString) {
            if (['0','1','2','3','4','5','6','7','8','9'].includes(char)) {
                charArray.push(char);
            }

            else if (char == '.' && this.decimals() > 0) {
                charArray.push(char);
            }
        }

        valueString = charArray.join('');

        //Decimals
        if (this.decimals() > 0) {
            let integerString = valueString.split('.')[0] || '';
            let decimalString = valueString.split('.')[1] || '';
            decimalString = decimalString.substring(0, this.decimals());

            if (valueString == '.') return '0.';

            else if (valueString.includes('.') && decimalString == '') {
                return (isNegative) ? `-${integerString}.` : `${integerString}.`;
            }

            else if (valueString.includes('.') && decimalString.endsWith('0')) {
                return (isNegative) ? `-${integerString}.${decimalString}` : `${integerString}.${decimalString}`;
            }

            else if (integerString == '' && decimalString == '') {
                return '0';
            }

            valueString = `${integerString}.${decimalString}`;
        }

        if (isNegative) {
            valueString = `-${valueString}`;
        }

        return Number(valueString);
    }


    /** */
    private ValidateRangeValue(value: string | number): string {
        if(['-', '.', '-.', '-0', '-0.'].includes(String(value))) {
            return String(value);
        }

        if(Number(value) < this.min()) {
            this.alert.Warning(`Minimum ${this.min()}`, 'Out of range', 'fa-solid fa-hashtag');
            value = this.min();
        }

        if(Number(value) > this.max()) {
            this.alert.Warning(`Cannot exceed ${this.max()}`, 'Out of range', 'fa-solid fa-hashtag');
            value = this.max();
        }

        if (this.decimals() <= 0) {
            if (String(value).includes('.')) {
                value = String(value).split('.')[0];
            }
        }

        return String(value);
    }


    /** */
    public Focus(timeout: number = 0): void {
        if(this._isLoadingEvent()) return;
        else this._isLoadingEvent.set(true);

        Tools.Sleep(timeout).then(() => {
            if(this._isEnable()) {
                this.element.focus();
            }

            this._isLoadingEvent.set(false);
        });
    }


    /** */
    public Select(timeout: number = 0): void {
        if(this._isLoadingEvent()) return;
        else this._isLoadingEvent.set(true);

        Tools.Sleep(timeout).then(() => {
            if(this._isEnable()) {
                this.element.focus();
                this.element.select();
            }

            this._isLoadingEvent.set(false);
        });
    }


    /** */
    public Blur(): void {
        if(this._isLoadingEvent()) return;
        else this._isLoadingEvent.set(true);

        Tools.Sleep().then(() => {
            if(this.element) {
                this.element.blur();

                setTimeout(() => {
                    const element = document.querySelector(`#${this._id}-container .mdc-line-ripple--active`);
                    if (element) element.classList.remove('mdc-line-ripple--active');
                    this._isLoadingEvent.set(false);
                })
            }
        });
    }
}