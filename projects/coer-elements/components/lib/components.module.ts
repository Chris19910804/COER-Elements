import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from 'coer-elements/directives';
import { PipesModule } from 'coer-elements/pipes';

//Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';

//Components
import { CoerButton } from './coer-button/coer-button.component';
import { CoerCheckbox } from './coer-checkbox/coer-checkbox.component';
import { CoerFilebox } from './coer-filebox/coer-filebox.component';
import { CoerForm } from './coer-form/coer-form.component';
import { CoerGrid } from './coer-grid/coer-grid.component';
import { CoerModal } from './coer-modal/coer-modal.component';
import { CoerNumberBox } from './coer-numberbox/coer-numberbox.component';
import { CoerPageTitle } from './coer-page-title/coer-page-title.component';
import { CoerSelectbox } from './coer-selectbox/coer-selectbox.component';
import { CoerSwitch } from './coer-switch/coer-switch.component';
import { CoerTab } from './coer-tab/coer-tab.component';
import { CoerTextarea } from './coer-textarea/coer-textarea.component';
import { CoerTextBox } from './coer-textbox/coer-textbox.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatInputModule,
        MatFormFieldModule,
        MatSlideToggleModule,
        MatTabsModule,
        DirectivesModule,
        PipesModule
    ],
    declarations: [
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
        CoerTextBox,
    ],
    exports: [
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
        CoerTextBox,
    ]
})
export class ComponentsModule { }