import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { DirectivesModule } from 'src/app/shared/directives/directives.module';
//import { PipesModule } from 'src/app/shared/pipes/pipes.module';

//Angular Material
//import { MatButtonModule } from '@angular/material/button';
//import { MatCheckboxModule } from '@angular/material/checkbox';
//import { MatInputModule } from '@angular/material/input';
//import { MatFormFieldModule } from '@angular/material/form-field';
//import { MatSlideToggleModule } from '@angular/material/slide-toggle';
//import { MatTabsModule } from '@angular/material/tabs';

//Components
import { CoerAlert } from './coer-alert/coer-alert.component';
//import { CoerButton } from './coer-button/coer-button.component';
//import { CoerCheckbox } from './coer-checkbox/coer-checkbox.component';
//import { CoerFilebox } from './coer-filebox/coer-filebox.component';
//import { CoerForm } from './coer-form/coer-form.component';
//import { CoerGrid } from './coer-grid/coer-grid.component';
//import { CoerModal } from './coer-modal/coer-modal.component';
//import { CoerNumberBox } from './coer-numberbox/coer-numberbox.component';
//import { CoerPageTitle } from './coer-page-title/coer-page-title.component';
//import { CoerSelectbox } from './coer-selectbox/coer-selectbox.component';
//import { CoerSwitch } from './coer-switch/coer-switch.component';
//import { CoerTab } from './coer-tab/coer-tab.component';
//import { CoerTextarea } from './coer-textarea/coer-textarea.component';
//import { CoerTextBox } from './coer-textbox/coer-textbox.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        //PipesModule,
        //MatButtonModule,
        //MatCheckboxModule,
        //MatInputModule,
        //MatFormFieldModule,
        //MatSlideToggleModule,
        //MatTabsModule,
        //DirectivesModule
    ],
    declarations: [
        CoerAlert,
        //CoerButton,
        //CoerCheckbox,
        //CoerFilebox,
        //CoerForm,
        //CoerGrid,
        //CoerModal,
        //CoerNumberBox,
        //CoerPageTitle,
        //CoerSelectbox,
        //CoerSwitch,
        //CoerTextarea,
        //CoerTab,
        //CoerTextBox,
    ],
    exports: [
        CoerAlert,
        //CoerButton,
        //CoerCheckbox,
        //CoerFilebox,
        //CoerForm,
        //CoerGrid,
        //CoerModal,
        //CoerNumberBox,
        //CoerPageTitle,
        //CoerSelectbox,
        //CoerSwitch,
        //CoerTextarea,
        //CoerTab,
        //CoerTextBox,
    ]
})
export class ComponentsModule { }
//export * from './coer-alert/coer-alert.component';
//export * from './coer-button/coer-button.component';
//export * from './coer-checkbox/coer-checkbox.component';
//export * from './coer-filebox/coer-filebox.component';
//export * from './coer-filebox/coer-filebox.interface';
//export * from './coer-form/coer-form.component';
//export * from './coer-grid/coer-grid.component';
//export * from './coer-grid/coer-grid.interface';
//export * from './coer-grid/coer-grid.templates';
//export * from './coer-modal/coer-modal.component';
//export * from './coer-numberbox/coer-numberbox.component';
//export * from './coer-page-title/coer-page-title.component';
//export * from './coer-page-title/pageTitle.interface';
//export * from './coer-selectbox/coer-selectbox.component';
//export * from './coer-switch/coer-switch.component';
//export * from './coer-tab/coer-tab.component';
//export * from './coer-textbox/coer-textbox.component';