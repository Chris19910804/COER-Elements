import { NgModule } from '@angular/core';
import { ComponentsModule as CoerElements } from 'coer-elements';

//Components
import {
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
    CoerSwitch,
    CoerTab,
    CoerTextarea,
    CoerTextBox
} from 'coer-elements';

@NgModule({
    imports: [CoerElements],
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
        CoerSwitch,
        CoerTextarea,
        CoerTab,
        CoerTextBox,
    ]
})
export class ComponentsModule { }