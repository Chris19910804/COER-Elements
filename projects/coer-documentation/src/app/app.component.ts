import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoerAlert, ComponentsModule } from 'coer-elements';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, ComponentsModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {

    //Injection
    protected readonly alert = inject(CoerAlert);

    title = 'Documentation';

    constructor() {
        setTimeout((() => {
            this.alert.Info();
        }));
    }
}