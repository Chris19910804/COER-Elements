//Modules
import { NgModule } from '@angular/core';
import { InterfacesRoutingModule } from './interfaces.routing';
import { SharedModule } from 'projects/coer-documentation/src/app/shared/shared.module';

//Pages

@NgModule({
    declarations: [],
    imports: [SharedModule, InterfacesRoutingModule],
    exports: [SharedModule]
})
export class InterfacesSubmodule { }