import { Component, computed, ElementRef, input, Input, OnInit, output, signal, viewChild } from '@angular/core';
import { CONTROL_VALUE, ControlValue, Tools } from 'coer-elements/tools';

@Component({
    selector: 'coer-selectbox',
    templateUrl: './coer-selectbox.component.html',
    styleUrl: './coer-selectbox.component.scss',
    providers: [CONTROL_VALUE(CoerSelectbox)]
})
export class CoerSelectbox<T> extends ControlValue implements OnInit {

    //Component Value
    protected override _value: T | null = null;

    //Variables
    private readonly _scrollByRow: number = 40.8;
    protected _coerTextBox = viewChild.required<ElementRef>('coerTextBox');
    protected _id: string = Tools.GetGuid('coer-selectBox');
    protected _index = signal<number>(-1);
    protected _search = signal<string>('');
    protected _isOpen = signal<boolean>(false);
    protected _isDirty = signal<boolean>(false);
    protected _isOverMenu = signal<boolean>(false);
    protected _isLoadingEvent = signal<boolean>(false);
    protected _scroll = signal<number>(0);
    protected _textbox!: HTMLInputElement;
    protected _dropDownMenu!: HTMLElement;
    protected _container!: HTMLElement;

    //Inputs
    @Input() set value(value: T | null | undefined) {
        if(Tools.IsNull(value)) value = null;
        this.SetValue(value);
    }

    @Input() id: string = '';
    public label = input<string>('');
    public dataSource = input<T[]>([]);
    public propDisplay = input<string>('name');
    public rowsByPage = input<number>(50);
    public placeholder = input<string>('-- Select --');
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

    //Outputs 
    public onSelected = output<T>();
    public onUnselect = output<void>();

    ngOnInit() {
        this.SetEvents();
    }

    //getter
    public get value() {
        return this._value;
    }


    //getter
    protected get _displayed(): string {
        return Tools.IsNotNull(this._value) ? (this._value as any)[this.propDisplay()] : '';
    }


    //getter
    protected get _placeholder(): string {
        let placeholder = this.placeholder();

        if (this.dataSource().length <= 0) {
            placeholder = '-- No Options --';
        }

        return Tools.IsNotNull(this._value)
            ? this._displayed
            : placeholder;
    }


    //computed
    protected get _showCancel(): boolean {
        return Tools.IsNotNull(this._value)
            && this._search().length <= 0;
    }


    //computed
    protected get paddingRight(): string {
        return this.isInvalid() || this.isValid() || this._showCancel
            ? '40px' : '15px';
    }


    //computed
    protected get widthIcons(): string {
        return this.isInvalid() || this.isValid() || this._showCancel
            ? '55px' : '30px';
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
    protected _dataSource = computed(() => {
        let index = 0;
        const search = this._search();
        const propDisplay = this.propDisplay();
        let dataSource = this.dataSource().map((item: any) => Object.assign(item, { index: index++ }));

        if (this._isDirty() && !this._isLoadingEvent()) {
            dataSource = [...dataSource].filter((item: any) => String(item[propDisplay]).trim().toUpperCase().includes(search.trim().toUpperCase()));
        }

        let indexRow = 0;
        return Tools.BreakReference(dataSource)
            .splice(0, this.rowsByPage())
            .map((item: any) => Object.assign(item, { indexRow: indexRow++ }));
    });


    /** */
    protected override SetValue(_value: any): void {
        if(_value === undefined) _value = null;

        if(Tools.IsNotOnlyWhiteSpace(this._value) && Tools.IsNull(_value)) {
            this.onUnselect.emit();
        }

        this._UpdateValue(_value);
        this._value = _value;
        this._search.set(this.GetDisplay(_value));
    }


    /** */
    public override writeValue(_value: any): void {
        if(_value === undefined) _value = null;
        this._value = _value;
        this._search.set(this.GetDisplay(_value));
    }


    /** */
    private SetEvents(): void {
        Tools.Sleep().then(()=> {
            //Container
            this._container = document.getElementById(`${this._id}-container`)! as HTMLElement;

            this._container.addEventListener('mouseenter', () => {
                this._isOverMenu.set(true);
            });

            this._container.addEventListener('mouseleave', () => {
                this._isOverMenu.set(false);
            });

            //DropDown
            this._dropDownMenu = document.getElementById(`${this._id}-dropdown-menu`)! as HTMLElement;

            this._dropDownMenu.addEventListener('mouseenter', () => {
                this._isOverMenu.set(true);
            });

            this._dropDownMenu.addEventListener('mouseleave', () => {
                this._isOverMenu.set(false);
            });

            //TextBox
            this._textbox = document.getElementById(this._id)! as HTMLInputElement;

            this._textbox.addEventListener('focus', () => {
                if (this._isEnable()) this.Focus();
                else this.Blur();
            });

            this._textbox.addEventListener('keyup', (event: KeyboardEvent) => {
                const { key } = event;

                if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
                    if(key === 'ArrowUp') {
                        const firstIndex = (this._dataSource().length <= 0) ? -1 : 0;

                        if((this._index() - 1) >= firstIndex) {
                            this._index.update(index => index - 1);

                            if(this._index() >= 3) this._scroll.update(scroll => scroll -= this._scrollByRow);
                            else this._scroll.set(0);

                            this._dropDownMenu.scrollTo(0, this._scroll());
                        }

                        else {
                            this._scroll.set(0);
                            this._index.set(-1);
                            this._textbox.focus();
                            this._textbox.select();
                        }

                        this._dropDownMenu.scrollTo(0, this._scroll());
                    }

                    else if(key === 'ArrowDown') {
                        const lastIndex = (this._dataSource().length - 1);

                        if ((this._index() + 1) <= lastIndex) {
                            this._index.update(index => index + 1);
                            if(this._index() >= 3) this._scroll.update(scroll => scroll += this._scrollByRow);
                        }

                        this._dropDownMenu.scrollTo(0, this._scroll());
                    }

                    else if (['ArrowLeft', 'ArrowRight'].includes(key)) {
                        if(Tools.IsNotNull(this._value) && !this._isDirty()) {
                            this._scroll.set(0);
                            this._dropDownMenu.scrollTo(0, this._scroll());
                            this.Search(this._displayed);
                        }

                        this._isDirty.set(true);
                    }
                }

                else {
                    if (key == 'Delete' && this._search() == '') {
                        this.Unselect();
                    }

                    this._isDirty.set(true);
                }
            });

            this._textbox.addEventListener('mouseenter', () => {
                this._isOverMenu.set(true);
            });

            this._textbox.addEventListener('mouseleave', () => {
                this._isOverMenu.set(false);
            });

            this._textbox.addEventListener('paste', () => {
                Tools.Sleep().then(_ => {
                    this._search.update(search => search = search.toString().trim());
                });
            });

            //Document
            document.addEventListener('click', () => {
                if(!this._isOverMenu()) this.Blur();
            });

            document.addEventListener('keyup', (event: KeyboardEvent) => {
                if (event.key === 'Enter') {
                    if (this._index() >= 0) {
                        if (Tools.IsNotNull(this._value) && this._search() == (this._value as any)[this.propDisplay()]) {
                            this._isLoadingEvent.set(true);
                        }

                        const dataSource = Tools.BreakReference(this._dataSource());
                        const _value = dataSource.find(x => x.indexRow == this._index());
                        this.SelectItem(_value);
                        this._isLoadingEvent.set(false);
                    }

                    this.Blur();
                }
            });
        });
    }


    /** */
    protected GetIndexRow = (item: any): number => {
        return item['indexRow'];
    }


    /** */
    protected GetDisplay = (item: any): string => {
        return Tools.IsNotNull(item) ? item[this.propDisplay()] : '';
    }


    /** */
    protected SelectItem(item: any): void {
        if (Tools.IsNotNull(item)) {
            const _item = Tools.BreakReference<any>(this.dataSource()[item.index]);

            if(Tools.IsNotNull(_item)) {
                this.SetValue(Tools.BreakReference(_item));
                this.Blur();
            }

            delete _item.indexRow;
            delete _item.index;
            this.onSelected.emit({ ..._item });
        }
    }


    /** */
    public Unselect(): void {
        this._search.set('');
        this.SetValue(null);
        this.Blur(); 
    }


    /** */
    public Focus(timeout: number = 0): void {
        if(this._isLoadingEvent()) return;
        else this._isLoadingEvent.set(true);

        Tools.Sleep(timeout).then(_ => {
            if(this._isEnable()) {
                this._textbox.focus();
                this._textbox.select();
                this.Open();
            }

            Tools.Sleep().then(_ => {
                if (Tools.IsNotNull(this._value)) {
                    this.Search(this._displayed);
                }

                this._isLoadingEvent.set(false);
            });
        });
    }


    /** */
    public Blur(): void {
        if(this._isLoadingEvent()) return;

        this._isLoadingEvent.set(true);
        this._isDirty.set(false);
        this._index.set(-1);
        this._scroll.set(0);
        this._dropDownMenu.scrollTo(0, this._scroll());
        this._search.set(this._displayed);

        Tools.Sleep().then(_ => {
            this._textbox.blur();
            this.Close();

            Tools.Sleep().then(_ => {
                const element = document.querySelector(`#${this._id}-container .mdc-line-ripple--active`);
                if (element) element.classList.remove('mdc-line-ripple--active');

                this._isLoadingEvent.set(false);
            });
        });
    }


    /** */
    private Open(): void {
        if (!this._dropDownMenu.classList.contains('show')) {
            this._dropDownMenu.classList.add('show');
        }

        this._isOpen.set(true);
    }


    /** */
    private Close() {
        if (this._dropDownMenu.classList.contains('show')) {
            this._dropDownMenu.classList.remove('show');
        }

        this._isOpen.set(false);
    }


    /** */
    protected Search(_value: string | number): void {
        this._search.set(String(_value));

        Tools.Sleep(0, `${this._id}-search`).then(_ => {
            const item = this._dataSource().find(item => String(item[this.propDisplay()]).trim().toUpperCase().includes(String(_value).trim().toUpperCase()));

            if(Tools.IsNotNull(item)) {
                this._index.set(item.indexRow);

                if(this._index() >= 3) {
                    this._scroll.set((this._index() - 2) * this._scrollByRow);
                }

                else {
                    this._scroll.set(0);
                }

                this._dropDownMenu.scrollTo(0, this._scroll());
            }
        });
    }
}