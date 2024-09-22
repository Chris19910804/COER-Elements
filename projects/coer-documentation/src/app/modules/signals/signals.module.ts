//Modules
import { NgModule } from '@angular/core';
import { SignalsRoutingModule } from './signals.routing';
import { SharedModule } from 'projects/coer-documentation/src/app/shared/shared.module';

//Pages

@NgModule({
    declarations: [],
    imports: [SharedModule, SignalsRoutingModule],
    exports: [SharedModule]
})
export class SignalsModule { }