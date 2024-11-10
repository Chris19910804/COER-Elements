import { Component, computed, EventEmitter, input, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Tools } from 'coer-elements/tools'
import { Tooltip } from 'bootstrap';

@Component({
    selector: 'coer-button',
    templateUrl: './coer-button.component.html',
    styleUrl: './coer-button.component.scss',
})
export class CoerButton implements OnInit, OnDestroy {

    //Variables
    protected _id: string = Tools.GetGuid('coer-button');
    private _element!: HTMLButtonElement;
    private _tooltip: string = '';
    private _tooltipElement!: Tooltip;

    //Inputs
    @Input() id: string = '';
    public color = input<'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation' | 'dark'>('default');
    public type = input<'filled' | 'outline' | 'icon' | 'icon-outline' | 'icon-no-border'>('filled');
    public icon = input<string>('');
    public iconPosition = input<'left' | 'right'>('left');
    public animation = input<boolean>(false);
    public isLoading = input<boolean>(false);
    public isDisabled = input<boolean>(false);
    public isInvisible = input<boolean>(false);
    public width = input<string>('125px');
    public minWidth = input<string>('30px');
    public height = input<string>('40px');
    public minHeight = input<string>('30px');
    public marginTop = input<string>('0px');
    public marginRight = input<string>('0px');
    public marginBottom = input<string>('0px');
    public marginLeft = input<string>('0px');
    public path = input<string | (string | number)[]>([]);
    public tooltipPosition = input<'top' | 'right' | 'bottom' | 'left'>('left');

    @Input() set tooltip(value: string) {
        this._tooltip = value;

        if(Tools.IsNotNull(this._tooltipElement)) {
            if (value) {
                this._tooltipElement.setContent({ '.tooltip-inner': this._tooltip });
                Tools.Sleep().then(() => this._tooltipElement.enable());
            }

            if (Tools.IsOnlyWhiteSpace(value)) {
                Tools.Sleep().then(() => this._tooltipElement.disable());
            }
        }
    }

    //Outputs
    @Output() onClick = new EventEmitter<MouseEvent>();


    //computed
    protected _isEnable = computed<boolean>(() => {
        return !this.isLoading() && !this.isDisabled() && !this.isInvisible();
    });


    //computed
    protected _icon = computed<string>(() => {
        switch(this.icon()) {
            case 'new': return 'fa-solid fa-plus fa-lg';
            case 'save': return 'fa-solid fa-floppy-disk fa-lg';
            case 'cancel': return 'fa-solid fa-xmark fa-lg';
            case 'import': return 'fa-solid fa-file-arrow-up fa-lg';
            case 'excel': return 'bi bi-filetype-xlsx fa-lg';
            case 'menu': return 'fa-solid fa-bars';
            case 'delete': return 'fa-solid fa-trash-can';
            case 'edit': return 'fa-solid fa-pen fa-lg';
            case 'go': return 'bi bi-box-arrow-right';
            case 'back': return 'bi bi-box-arrow-left';
            case 'pointer': return 'bi bi-hand-index-thumb-fill';
            default: return this.icon();
        }
    });


    ngOnInit() {
        this.SetToolTip();
        this.SetEvents();
    }

    ngOnDestroy() {
        if (this._tooltipElement) {
            Tools.Sleep().then(() => this._tooltipElement.dispose());
        }
    }


    /** */
    private SetEvents(): void {
        Tools.Sleep().then(() => {
            this._element = document.getElementById(`${this._id}-inner-button`)! as HTMLButtonElement;

            if (Tools.IsNotNull(this._element)) {
                this._element.addEventListener('focus', () => {
                    if (!this._isEnable()) this.Blur();
                });
            }
        });
    }


    private SetToolTip(): void {
        Tools.Sleep().then(() => {
            const htmlElement = document.getElementById(`${this._id}-container`)!;

            if (Tools.IsNotNull(htmlElement)) {
                htmlElement.addEventListener('mouseleave', () => {
                    if (Tools.IsNotNull(htmlElement) && Tools.IsNotNull(this._tooltipElement)) {
                        this._tooltipElement.hide();
                    }
                });

                this._tooltipElement = new Tooltip(htmlElement, {
                    html: true,
                    title: this._tooltip,
                    placement: this.tooltipPosition
                });
            }
        });
    }


    /** */
    protected Click(event: MouseEvent) {
        if (this._isEnable()) {
            this.onClick.emit(event);
        }

        this.Blur();
    }


    /** */
    public Focus(timeout: number = 0): void {
        Tools.Sleep(timeout).then(() => {
            if (this._isEnable()) this._element.focus();
        });
    }


    /** */
    public Blur(): void {
        Tools.Sleep().then(() => {
            this._element.blur();
        });
    }
}