import { Component } from '@angular/core';
import { Page } from 'coer-elements/tools';

@Component({
    selector: 'coer-list-page',
    templateUrl: './coer-list.component.html',
    styleUrl: './coer-list.component.scss'
})
export class CoerListPage extends Page {

     
    constructor() { super('coer-list') }

    items: any = [
        { id: 0, name: 'batman' },
        { id: 1, name: 'superman' },
        { id: 2, name: 'spiderman' },
        { id: 3, name: 'iroman' },
        { id: 4, name: 'hulk' },
        { id: 5, name: 'Link' },
        { id: 6, name: 'Sub-Zero' },

    ]


    /** */
    protected Delete(ev: any): void {
        console.log(ev)
    }


    /** */
    protected Drop(ev: any): void {
        console.log(ev)
    }


    template (e: any, i: number) {
        return ``;
    }


    showDeleteButton (e: any, i: number) {
        return e.name != 'hulk'
    }
}