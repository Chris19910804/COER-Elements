import { NgModule } from '@angular/core';
import { DirectivesModule as CoerElements } from 'coer-elements/directives';

//Directives
import { CoerRefDirective, LifeCycleDirective } from 'coer-elements/directives';

@NgModule({
    imports: [CoerElements],
    exports: [
        CoerRefDirective,
        LifeCycleDirective
    ]
})
export class DirectivesModule { }