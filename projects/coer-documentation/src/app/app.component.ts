import { Component, viewChild } from '@angular/core';
import { HomeModule } from './modules/home/home.module';
import { navigationSIGNAL } from 'coer-elements/signals';
import { CoerSidenav } from 'coer-elements/components';
import { Menu, Tools } from 'coer-elements/tools';
declare const appSettings: any;

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [HomeModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {

    //Variables
    protected appName: string = appSettings.info.name;

    //Elements
    protected sidenav = viewChild.required<CoerSidenav>('sidenav');

    constructor() {
        this.GetNavigation();
    }


    private GetNavigation() {
        const navigation = [
            { label: 'Home', icon: 'fa-sharp fa-solid fa-house', path: '/home' },
            //BACK-END
            { label: 'Back End', icon: 'fa-solid fa-book', items: [

            ]},
            //FRONT-END
            { label: 'Front End', icon: 'fa-solid fa-book', items: [
                { label: 'Components', items: [
                    { label: 'Button', path: '/front-end/components/coer-button' },
                    { label: 'List', path: '/front-end/components/coer-list' },
                ]},
            ]},
        ];

        navigationSIGNAL.set(navigation);
        Tools.Sleep().then(() => this.sidenav().SetActiveLink(Menu.GetSelectedOption()));
    }
}