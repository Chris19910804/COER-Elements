import { Component, computed, ElementRef, input, Input, OnInit, output, signal, viewChild } from '@angular/core';
import { IBoxButton } from 'coer-elements/interfaces';
import { CONTROL_VALUE, ControlValue, Tools } from 'coer-elements/tools';

@Component({
    selector: 'coer-textbox',
    templateUrl: './coer-textbox.component.html',
    styleUrl: './coer-textbox.component.scss',
    providers: [CONTROL_VALUE(CoerTextBox)]
})
export class CoerTextBox extends ControlValue implements OnInit {

    //Component Value
    protected override _value: string | number = '';
    protected matFormField = viewChild.required<ElementRef>('matFormField');
    protected coerTextBox = viewChild.required<ElementRef>('coerTextBox');

    //Variables
    protected _id: string = Tools.GetGuid('coer-textBox');
    protected _isLoadingEvent = signal<boolean>(false);
    private element!: HTMLInputElement;

    //Inputs
    @Input() set value(value: string | number | null | undefined) {
        if(Tools.IsNull(value)) value = '';
        this.SetValue(value);
    }

    @Input() id: string = '';
    @Input() button: IBoxButton = { show: false };
    public label = input<string>('');
    public placeholder = input<string>('');
    public minLength = input<number | string>(0);
    public maxLength = input<number | string>(50);
    public showSearchIcon = input<boolean>(false);
    public showClearIcon = input<boolean>(false);
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
    public textPosition = input<'left' | 'center' | 'right'>('left'); 

    //Outputs
    public onKeyupEnter = output<string | number>();
    public onInput = output<string | number>();
    public onClickClear = output<void>();
    public onClickButton = output<void>();

    ngOnInit() {
        this.SetEvents();
    }


    //getter
    protected get _showSearchIcon() {
        return this.showSearchIcon()
            && !this._showClearIcon
            && !this.isDisabled()
            && !this.isLoading()
    }


    //getter
    protected get _showClearIcon() {
        return this.showClearIcon()
            && !this.isDisabled()
            && !this.isLoading()
            && this._value != undefined
            && String(this._value).length > 0
    }


    //getter
    protected get _showButtonLeft(): boolean {
        return this.button.show
            && Tools.IsNotNull(this.button?.position)     
            && this.button?.position === 'left';   
    }


    //getter
    protected get _showButtonRight(): boolean {
        return  this.button.show
            && ((Tools.IsNull(this.button?.position) || this.button?.position === 'right'))
               
    }


    //getter
    protected get _buttonIcon(): string {
        return (Tools.IsNotOnlyWhiteSpace(this.button?.icon))
            ? this.button.icon! : 'pointer';
    }


    //getter
    protected get _buttonIsDisabled(): boolean {
        return (Tools.IsNotNull(this.button?.isDisabled))
            ? this.button.isDisabled! : false;
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


    /** */
    private SetEvents(): void {
        Tools.Sleep().then(()=> {
            this.element = document.getElementById(this._id)! as HTMLInputElement;

            if (this.element) {
                this.element.addEventListener('focus', () => {
                    if (!this._isEnable()) this.Blur();
                    else if (this.selectOnFocus()) this.Select();
                });

                this.element.addEventListener('keyup', (event: KeyboardEvent) => {
                    if (this._isEnable()) {
                        const { key } = event;

                        if (key === 'Enter') {
                            const value = this.coerTextBox().nativeElement.value;
                            this.onKeyupEnter.emit(value);
                            this.Blur();
                        }
                    }
                });

                this.element.addEventListener('blur', () => this.Blur());

                this.element.addEventListener('input', () => {
                    Tools.Sleep().then(() => {
                        const value = this.coerTextBox().nativeElement.value;
                        if (this._isEnable()) this.onInput.emit(value);
                    });
                });


                this.element.addEventListener('paste', () => {
                    Tools.Sleep().then(() => {
                        this.SetValue(this._value.toString().trim());
                    });
                });
            }
        });
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

                Tools.Sleep().then(() => {
                    const element = document.querySelector(`#${this._id}-container .mdc-line-ripple--active`);
                    if (element) element.classList.remove('mdc-line-ripple--active');
                })
            }

            this._isLoadingEvent.set(false);
        });
    }


    /** */
    public Clear(): void {
        this.SetValue('');
        this.Focus();
    }


    /** */
    protected ClickSearch(): void {
        Tools.Sleep().then(() => {
            if (this._isEnable()) {
                if (this.showClearIcon()) this.Focus();

                else {
                    this.onKeyupEnter.emit(this._value);
                    this.Blur();
                }
            }
        })
    }
}