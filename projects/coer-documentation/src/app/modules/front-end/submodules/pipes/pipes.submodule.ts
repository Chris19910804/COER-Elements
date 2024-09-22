//Modules
import { NgModule } from '@angular/core';
import { PipesRoutingModule } from './pipes.routing';
import { SharedModule } from 'projects/coer-documentation/src/app/shared/shared.module';

//Pages

@NgModule({
    declarations: [],
    imports: [SharedModule, PipesRoutingModule],
    exports: [SharedModule]
})
export class PipesSubmodule { }