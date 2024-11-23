import { NgModule } from '@angular/core';

//Components
import { CoerAlert } from 'coer-elements/tools';
import * as components from 'coer-elements/components';
import * as directives from 'coer-elements/directives';
import * as pipes from 'coer-elements/pipes';


@NgModule({
    imports: [
        components.ComponentsModule, 
        directives.DirectivesModule,
        pipes.PipesModule,
        CoerAlert
    ],
    exports: [
        CoerAlert,
        components.CoerButton,
        components.CoerCheckbox,
        components.CoerFilebox,
        components.CoerForm,
        components.CoerGrid,
        components.CoerList,
        components.CoerModal,
        components.CoerNumberBox,
        components.CoerPageTitle,
        components.CoerSelectbox,
        components.CoerSidenav,
        components.CoerSwitch,
        components.CoerTextarea,
        components.CoerTab,
        components.CoerTextBox,
        components.CoerToolbar,
        directives.CoerRefDirective,
        directives.LifeCycleDirective,
        pipes.HtmlPipe,
        pipes.NoImagePipe,
        pipes.NumericFormatPipe
    ]
})
export class CoerElementsModule { }