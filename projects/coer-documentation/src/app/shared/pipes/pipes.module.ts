import { NgModule } from '@angular/core';

//Pipes
import * as coerElements from 'coer-elements/pipes';

@NgModule({
    imports: [coerElements.PipesModule],
    exports: [
        coerElements.HtmlPipe,
        coerElements.NoImagePipe,
        coerElements.NumericFormatPipe
    ]
})
export class PipesModule { }