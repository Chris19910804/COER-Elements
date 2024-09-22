import { Component } from '@angular/core';
import { Page } from 'coer-elements/tools';

@Component({
    selector: 'coer-button-page',
    templateUrl: './coer-button.component.html',
    styleUrl: './coer-button.component.scss'
})
export class CoerButtonPage extends Page {

    constructor() { super('coer-button') }
}