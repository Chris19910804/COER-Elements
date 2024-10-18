import { NgModule } from '@angular/core';

//Components
import { CoerAlert } from 'coer-elements/tools';
import * as coerElements from 'coer-elements/components';

@NgModule({
    imports: [coerElements.ComponentsModule, CoerAlert],
    exports: [
        CoerAlert,
        coerElements.CoerButton,
        coerElements.CoerCheckbox,
        coerElements.CoerFilebox,
        coerElements.CoerForm,
        coerElements.CoerGrid,
        coerElements.CoerModal,
        coerElements.CoerNumberBox,
        coerElements.CoerPageTitle,
        coerElements.CoerSelectbox,
        coerElements.CoerSidenav,
        coerElements.CoerSwitch,
        coerElements.CoerTextarea,
        coerElements.CoerTab,
        coerElements.CoerTextBox,
        coerElements.CoerToolbar
    ]
})
export class ComponentsModule { }