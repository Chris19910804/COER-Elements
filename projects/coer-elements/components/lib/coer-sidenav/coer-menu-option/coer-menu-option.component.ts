import { AfterContentInit, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { IMenu, IMenuOptionSelected } from 'coer-elements/interfaces';
import { Tools, Source } from 'coer-elements/tools';
import { Router } from '@angular/router';

@Component({
    selector: 'coer-menu-option',
    templateUrl: './coer-menu-option.component.html',
    styleUrl: './coer-menu-option.component.scss'
})
export class CoerMenuOption implements AfterContentInit {

    //Injects
    private _router = inject(Router);

    //Inputs
    @Input() level: number = 1;
    @Input() label: string = '';
    @Input() icon!: undefined | string;
    @Input() path!: undefined | string;
    @Input() tree: IMenu[] = [];

    //Outputs
    @Output() clickMenuOption = new EventEmitter<IMenuOptionSelected>();

    ngAfterContentInit() {
        setTimeout(async () => {
            while (['', '/'].includes(this._router.url)) {
                await Tools.Sleep(100);
            }

            let queryParams = '';
            let routerURL = this._router.url;

            if (this._router.url.includes('?')) {
                routerURL = this._router.url.split('?')[0];
                queryParams = this._router.url.split('?')[1];
            }

            if (routerURL == this.path) {
                this.ClickMenuOption(queryParams, false);
            }
        });
    }


    protected get _icon(): string {
        return (this.icon && this.icon.length > 0)
            ? this.icon : 'bi bi-record-fill';
    }


    protected get _path(): string {
        return (this.path && this.path.length > 0)
            ? this.path : '/home';
    }


    protected get _tree(): IMenu[] {
        return [...this.tree].concat({
            label: this.label,
            icon: this._icon,
            path: this._path
        })
    }


    protected get marginLeft(): string {
        return this.level == 3
            ? `${(this.level - 1) * 10}px`
            : `${(this.level - 1) * 20}px`;
    }


    protected get identityClass(): string {
        let identity: string = '';

        for(let i = 0; i < this.tree.length; i++) {
            identity += `lv${i + 1}${this.tree[i].label}-`;
        }

        identity += `lv${this.level}${this.label}`;
        if(identity.includes(' ')) identity = identity.replaceAll(' ', '');
        return identity.toLowerCase();
    }


    /** */
    public ClickMenuOption(queryParams: string, resetSource: boolean = true) {
        if (resetSource) {
            let routerURL = this._router.url;

            if (this._router.url.includes('?')) {
                routerURL = this._router.url.split('?')[0];
            }

            if (routerURL != this.path) {
                Source.Reset();
            }
        }

        this.clickMenuOption.emit({
            level: this.level,
            label: this.label,
            path: this._path,
            icon: this._icon,
            tree: [...this._tree],
            queryParams: queryParams
        })
    }
}