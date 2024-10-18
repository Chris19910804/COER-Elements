import { NgModule } from '@angular/core';

//Directives
import * as coerElements from 'coer-elements/directives';

@NgModule({
    imports: [coerElements.DirectivesModule],
    exports: [
        coerElements.CoerRefDirective,
        coerElements.LifeCycleDirective
    ]
})
export class DirectivesModule { }