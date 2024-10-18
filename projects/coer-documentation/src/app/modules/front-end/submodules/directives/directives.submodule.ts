//Modules
import { NgModule } from '@angular/core';
import { DirectivesRoutingModule } from './directives.routing';
import { SharedModule } from 'projects/coer-documentation/src/app/shared/shared.module';

//Pages

@NgModule({
    declarations: [],
    imports: [SharedModule, DirectivesRoutingModule]
})
export class DirectivesSubmodule { }