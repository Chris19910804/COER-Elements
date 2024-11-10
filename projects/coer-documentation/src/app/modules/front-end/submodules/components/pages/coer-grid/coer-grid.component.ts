import { Component } from '@angular/core'; 
import { Page, Tools } from 'coer-elements/tools';

@Component({
    selector: 'coer-grid-page',
    templateUrl: './coer-grid.component.html',
    styleUrl: './coer-grid.component.scss'
})
export class CoerGridPage extends Page { 
     
    constructor() { super('coer-grid') }

    items: any = [
        { id: 0, name: 'batman', icon: 'fa-solid fa-book', isActive: true, module: 'jfmhgfmtdjm', submodule: '' },
        { id: 1, name: 'superman', icon: '', isActive: false, module: '', submodule: 'jfmhgfmtdjm' },
        { id: 2, name: 'spiderman', icon: 'bi bi-record-fill', isActive: true, module: '', submodule: '' },
        { id: 3, name: 'iroman', icon: '', isActive: false, module: '', submodule: 'jfmhgfmtdjm' },
        { id: 4, name: 'hulk', icon: 'bi bi-record-fill', isActive: true, module: 'jfmhgfmtdjm', submodule: '' },
        { id: 5, name: 'Link', icon: '', isActive: true, module: '', submodule: '' },
        { id: 6, name: 'Sub-Zero', icon: '', isActive: true, module: '', submodule: '' },

    ]


    /** */ 
    protected template = (item: any): string => {     
        return Tools.IsNotOnlyWhiteSpace(item?.value) 
            ? `<i class='${item.value}'></i>`
            : `<i class='bi bi-record-fill text-transparent'></i>`;
    }

     
}