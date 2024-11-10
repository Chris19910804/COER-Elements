//Modules
import { NgModule } from '@angular/core';
import { ComponentsRoutingModule } from './components.routing';
import { SharedModule } from 'projects/coer-documentation/src/app/shared/shared.module';
import { ComponentsModule } from "../../../../../../../coer-elements/components/lib/components.module";

//Pages
import { CoerButtonPage } from './pages/coer-button/coer-button.component';
import { CoerGridPage } from './pages/coer-grid/coer-grid.component';
import { CoerListPage } from './pages/coer-list/coer-list.component';
import { CoerTextboxPage } from './pages/coer-textbox/coer-textbox.component';


@NgModule({
    declarations: [
        CoerButtonPage,
        CoerGridPage,
        CoerListPage,
        CoerTextboxPage
    ],
    imports: [SharedModule, ComponentsRoutingModule, ComponentsModule]
})
export class ComponentsSubmodule { }