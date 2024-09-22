import { Component } from '@angular/core';
import { Page } from 'coer-elements/tools';

@Component({
    selector: 'main-page',
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss'
})
export class MainPage extends Page {

    constructor() {
        super('Home');
    }
}