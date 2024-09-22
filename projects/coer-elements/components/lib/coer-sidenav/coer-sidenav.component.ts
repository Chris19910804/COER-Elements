import { Component, OnInit, WritableSignal, inject, viewChild, viewChildren } from '@angular/core';
import { IMenu, IMenuSelected, IMenuOptionSelected, IScreenSize } from 'coer-elements/interfaces';
import { CoerTreeAccordion } from './coer-tree-accordion/coer-tree-accordion.component';
import { breakpointSIGNAL, isModalOpenSIGNAL, isMenuOpenSIGNAL, navigationSIGNAL } from 'coer-elements/signals';
import { Tools, Breadcrumbs, Menu, Screen } from 'coer-elements/tools';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
    selector: 'coer-sidenav',
    templateUrl: './coer-sidenav.component.html',
    styleUrl: './coer-sidenav.component.scss'
})
export class CoerSidenav implements OnInit {

    //Injections
    private _router = inject(Router);

    //signals
    protected isOpen: WritableSignal<boolean> = isMenuOpenSIGNAL;
    protected _isModalOpen: WritableSignal<boolean> = isModalOpenSIGNAL;
    protected _navigation: WritableSignal<IMenu[]> = navigationSIGNAL;

    //Elements
    protected sidenav = viewChild.required<MatDrawer>('matSidenav');
    protected menuList = viewChildren(CoerTreeAccordion);

    //getter
    protected get backdrop(): boolean {
        return ['xs', 'sm', 'md'].includes(breakpointSIGNAL());
    }

    //getter
    protected get mode(): 'over' | 'push' {
        return ['xs', 'sm', 'md'].includes(breakpointSIGNAL()) ? 'over' : 'push';
    }

    //getter
    protected get showAsideMenu(): boolean {
        return ['xl', 'xxl'].includes(breakpointSIGNAL()) && !this.isOpen()
    }

    constructor() {
        this.BackButtonBrowser();

        this.isOpen.set(['xxl'].includes(Screen.BREAKPOINT));

        Screen.Resize.subscribe({
            next: ({ breakpoin }: IScreenSize) => {
                breakpointSIGNAL.set(breakpoin);
                if(this.backdrop) this.Close();
            }
        });
    }


    ngOnInit() {
        Tools.Sleep().then(() => this.SetActiveLink(Menu.Get()));
    }


    /** */
    protected NavigateTo(selectedOption: IMenuOptionSelected) {
        let url = `${selectedOption.path}`;
        if (selectedOption.queryParams.length > 0) url += `?${selectedOption.queryParams}`;
        this._router.navigateByUrl(url);

        //Set active link
        this.SetActiveLink(selectedOption);

        //Close Menu
        if(selectedOption.level == 1) {
            for(const menuLv1 of this.menuList()) {
                for(const menuLv2 of menuLv1.menuList.toArray()) {
                    menuLv2.Close();
                }
                menuLv1.Close();
            }
        }
    }


    /** */
    private SetActiveLink(selectedOption: IMenuOptionSelected | null): void {
        if (selectedOption) {
            selectedOption = Tools.BreakReference(selectedOption);
            Menu.Set(selectedOption);

            let collection: Element[] = [];
            collection = collection.concat(Array.from(document.querySelectorAll('mat-drawer-container span.icon-container')));
            collection = collection.concat(Array.from(document.querySelectorAll('mat-drawer-container span.label-container')));

            //Remove active-link
            for(const element of collection) {
                if(element.classList.contains('active-link')) {
                    element.classList.remove('active-link');
                }
            }

            //Add active-link
            const levels = selectedOption.tree.length;
            for(let i = 0; i < levels; i++) {
                for(const element of collection) {
                    const identityClass = this.GetIdentityClass(selectedOption.tree);
                    if (element.classList.contains(identityClass)) {
                        element.classList.add('active-link');
                    }
                }

                selectedOption.tree.pop();
            }
        }
    }


    /** */
    public Open(event: MouseEvent, item: IMenu | null = null): void {
        event.stopPropagation();

        if (!this.isOpen()) {
            this.isOpen.set(true);
            this.sidenav().open();
        }
    }


    /** */
    public Close(): void {
        if (this.isOpen()) {
            this.isOpen.set(false);
            this.sidenav().close();
        }
    }


    /** */
    public Toggle(): void {
        this.sidenav().toggle();
    }


    /** */
    protected MenuSelected(selectedMenu: IMenuSelected) {
        if (selectedMenu.level == 1) {
            for(const menuLv1 of this.menuList()) {
                if(menuLv1.item.label != selectedMenu.label) {

                    for(const menuLv2 of menuLv1.menuList.toArray()) {
                        menuLv2.Close();
                    }

                    menuLv1.Close();
                }
            }
        }
    }


    /** */
    protected IsMenu = (item: IMenu): boolean => item.hasOwnProperty('items');


    /** */
    protected GetIcon = (item: IMenu): string => {
        if (item && item.hasOwnProperty('icon') && item.icon!.length > 0) {
            return item.icon!
        }

        return this.IsMenu(item)
            ? 'fa-solid fa-bars'
            : 'bi bi-record-fill';
    }


    /** */
    protected SetIdentityClass = (label: String): string => {
        let identity = `lv1${label}`;
        if(identity.includes(' ')) identity.replaceAll(' ', '');
        return identity.toLowerCase();
    }


    /** */
    private GetIdentityClass(tree: IMenu[]): string {
        let identity: string = '';

        for(let i = 0; i < tree.length; i++) {
            identity += `lv${i + 1}${tree[i].label}-`;
        }

        if(identity.endsWith('-')) identity = identity.slice(0, -1);
        if(identity.includes(' ')) identity.replaceAll(' ', '');
        return identity.toLowerCase();
    }


    /** */
    private BackButtonBrowser() {
        const QUERY_SELECTOR = 'coer-menu-option[ng-reflect-path="[path]"] mat-nav-list.coer-menu-option';

        window.addEventListener('popstate', popStateEvent => {
            if (popStateEvent.state && popStateEvent.target) {
                let path: string = (popStateEvent.target as any).location.href;
                if (path.includes('/#/')) path = path.split('/#')[1];
                if (path.includes('?')) path = path.split('?')[0];


                //Validate path
                for (const module of navigationSIGNAL()) {
                    if (module.items) for (const subModule of module.items) {
                        //Level Three
                        if (subModule.items) {
                            for(const item of subModule.items) if (item.path === path) {
                                (document.querySelector(QUERY_SELECTOR.replace('[path]', path)) as any)?.click();
                                return;
                            }
                        }

                        //Level Two
                        else if (subModule.path === path) {
                            (document.querySelector(QUERY_SELECTOR.replace('[path]', path)) as any)?.click();
                            return;
                        }
                    }

                    //Level One
                    else if (module.path === path) {
                        (document.querySelector(QUERY_SELECTOR.replace('[path]', path)) as any)?.click();
                        return;
                    }
                }

                Breadcrumbs.Remove(path);
            }
        });
    }
}