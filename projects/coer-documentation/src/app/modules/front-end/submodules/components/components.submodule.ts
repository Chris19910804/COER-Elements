//Modules
import { NgModule } from '@angular/core';
import { ComponentsRoutingModule } from './components.routing';
import { SharedModule } from 'projects/coer-documentation/src/app/shared/shared.module';

//Pages
import { CoerButtonPage } from './pages/coer-button/coer-button.component';


@NgModule({
    declarations: [
        CoerButtonPage
    ],
    imports: [SharedModule, ComponentsRoutingModule],
    exports: [SharedModule]
})
export class ComponentsSubmodule { }