import { NgModule } from '@angular/core';
import { ComponentsModule as CoerElements } from 'coer-elements/components';

//Components
import { CoerAlert } from 'coer-elements/tools';
import {
    CoerButton,
    CoerCheckbox,
    CoerFilebox,
    CoerForm,
    CoerGrid,
    CoerModal,
    CoerNumberBox,
    CoerPageTitle,
    CoerSelectbox,
    CoerSidenav,
    CoerSwitch,
    CoerTab,
    CoerTextarea,
    CoerTextBox,
    CoerToolbar
} from 'coer-elements/components';

@NgModule({
    imports: [CoerElements, CoerAlert],
    exports: [
        CoerAlert,
        CoerButton,
        CoerCheckbox,
        CoerFilebox,
        CoerForm,
        CoerGrid,
        CoerModal,
        CoerNumberBox,
        CoerPageTitle,
        CoerSelectbox,
        CoerSidenav,
        CoerSwitch,
        CoerTextarea,
        CoerTab,
        CoerTextBox,
        CoerToolbar
    ]
})
export class ComponentsModule { }