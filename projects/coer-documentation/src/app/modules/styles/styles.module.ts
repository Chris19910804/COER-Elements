//Modules
import { NgModule } from '@angular/core';
import { StylesRoutingModule } from './styles.routing';
import { SharedModule } from 'projects/coer-documentation/src/app/shared/shared.module';

//Pages

@NgModule({
    declarations: [],
    imports: [SharedModule, StylesRoutingModule],
    exports: [SharedModule]
})
export class StylesModule { }