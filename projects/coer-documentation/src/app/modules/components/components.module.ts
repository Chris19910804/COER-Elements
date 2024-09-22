//Modules
import { NgModule } from '@angular/core';
import { ComponentsRoutingModule } from './components.routing';
import { SharedModule } from 'projects/coer-documentation/src/app/shared/shared.module';

//Pages


@NgModule({
    declarations: [

    ],
    imports: [SharedModule, ComponentsRoutingModule],
    exports: [SharedModule]
})
export class ComponentsModule { }