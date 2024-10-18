//Modules
import { NgModule } from '@angular/core';
import { ComponentsRoutingModule } from './components.routing';
import { SharedModule } from 'projects/coer-documentation/src/app/shared/shared.module';

//Pages
import { CoerButtonPage } from './pages/coer-button/coer-button.component';
import { ComponentsModule } from "../../../../../../../coer-elements/components/lib/components.module";


@NgModule({
    declarations: [
        CoerButtonPage
    ],
    imports: [SharedModule, ComponentsRoutingModule, ComponentsModule]
})
export class ComponentsSubmodule { }