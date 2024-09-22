import { Component, Input } from '@angular/core';
import { IBreadcrumb, IGoBack } from 'coer-elements/interfaces';
import { Menu } from 'coer-elements/tools';
//import { navigation } from 'src/app/app-routing.sidenav';
//import { Source } from 'src/app/modules/home/classes';
//import { IAppNavigation, IGoBack } from 'src/app/modules/home/interfaces';

@Component({
    selector: 'coer-page-title',
    templateUrl: './coer-page-title.component.html',
    styleUrls: ['./coer-page-title.component.scss']
})
export class CoerPageTitle {

    @Input() title: string | null = null;
    @Input() showNavigation: boolean = true;
    @Input() breadcrumbs: IBreadcrumb[] = [];
    @Input() goBack: IGoBack = { show: false };
    @Input() showInformation: boolean = false;

    protected get _icon(): string {
        const MENU = Menu.GetSelectedOption();

        if(MENU) {
            const MENU_SELECTED = MENU.tree.shift();
            if(MENU_SELECTED && MENU_SELECTED.icon) {
                return MENU_SELECTED.icon;
            }
        }

        return 'bi bi-house-door-fill';
    }

    //Modal Information
    //protected showModal: boolean = false;
    //@Input() urlTemplate: string | null = null;
    //@Input() informationTitle: string = 'Information';
    //@Input() informationIcon: string = 'bi bi-info-circle';
    //@Input() informationIconColor: string = 'black';
    //@Input() width: string = '500px';
    //@Input() height: string = '430px';

    //ngOnInit() {
    //    let module = Source.GetCurrentModule() as any;
    //    if (module.module) {
    //        module = navigation.find(x => x.text == module.module);
    //        if (module && module.icon) this.icon = module.icon;
    //    }
    //}
}