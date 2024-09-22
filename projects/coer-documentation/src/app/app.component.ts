import { Component } from '@angular/core';
import { HomeModule } from './modules/home/home.module';
import { navigationSIGNAL } from 'coer-elements/signals';
declare const appSettings: any;

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [HomeModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {

    protected appName: string = appSettings.info.name;

    constructor() {
        this.GetNavigation();
    }


    private GetNavigation() {
        const navigation = [
            { label: 'Home', icon: 'fa-sharp fa-solid fa-house', path: '/home' },
            { label: 'Components', icon: 'fa-solid fa-book', path: '/home' }
        ];

        navigationSIGNAL.set(navigation);
    }
}