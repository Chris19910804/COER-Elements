import { NgModule } from '@angular/core';
import { CoerRefDirective } from './coer-ref.directive';
import { LifeCycleDirective } from './life-cycle.directive';

@NgModule({
    declarations: [
        CoerRefDirective,
        LifeCycleDirective,
    ],
    exports: [
        CoerRefDirective,
        LifeCycleDirective
    ]
})
export class DirectivesModule { }