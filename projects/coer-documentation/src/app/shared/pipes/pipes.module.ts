import { NgModule } from '@angular/core';
import { PipesModule as CoerElements } from 'coer-elements/pipes';

//Pipes
import {
    HtmlPipe,
    NoImagePipe,
    NumericFormatPipe
} from 'coer-elements/pipes';

@NgModule({
    imports: [CoerElements],
    exports: [
        HtmlPipe,
        NoImagePipe,
        NumericFormatPipe
    ]
})
export class PipesModule { }