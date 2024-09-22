//Modules
import { NgModule } from '@angular/core';
import { ToolsRoutingModule } from './tools.routing';
import { SharedModule } from 'projects/coer-documentation/src/app/shared/shared.module';

//Pages

@NgModule({
    declarations: [],
    imports: [SharedModule, ToolsRoutingModule],
    exports: [SharedModule]
})
export class ToolsSubmodule { }