import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from 'coer-elements/directives';
import { PipesModule } from 'coer-elements/pipes';
import { CdkDrag, CdkDragPlaceholder, CdkDropList } from '@angular/cdk/drag-drop';

//Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDrawer, MatDrawerContainer, MatDrawerContent, } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

//Components
import { CoerAccordion } from './coer-accordion/coer-accordion.component';
import { CoerButton } from './coer-button/coer-button.component';
import { CoerCheckbox } from './coer-checkbox/coer-checkbox.component';
import { CoerFilebox } from './coer-filebox/coer-filebox.component';
import { CoerForm } from './coer-form/coer-form.component';
import { CoerGrid } from './coer-grid/coer-grid.component';
import { CoerList } from './coer-list/coer-list.component';
import { CoerMenuOption } from './coer-sidenav/coer-menu-option/coer-menu-option.component';
import { CoerModal } from './coer-modal/coer-modal.component';
import { CoerNumberBox } from './coer-numberbox/coer-numberbox.component';
import { CoerPageTitle } from './coer-page-title/coer-page-title.component';
import { CoerSidenav } from './coer-sidenav/coer-sidenav.component';
import { CoerSelectbox } from './coer-selectbox/coer-selectbox.component';
import { CoerSwitch } from './coer-switch/coer-switch.component';
import { CoerTab } from './coer-tab/coer-tab.component';
import { CoerTextarea } from './coer-textarea/coer-textarea.component';
import { CoerTextBox } from './coer-textbox/coer-textbox.component';
import { CoerToolbar } from './coer-sidenav/coer-toolbar/coer-toolbar.component';
import { CoerTreeAccordion } from './coer-sidenav/coer-tree-accordion/coer-tree-accordion.component';

@NgModule({
    imports: [
        CommonModule,
        CdkDrag, 
        CdkDragPlaceholder,
        CdkDropList, 
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDrawerContainer,
        MatDrawerContent,
        MatDrawer,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MatSlideToggleModule,
        MatToolbarModule,
        MatTabsModule,
        DirectivesModule,
        PipesModule
    ],
    declarations: [
        CoerAccordion,
        CoerButton,
        CoerCheckbox,
        CoerFilebox,
        CoerForm,
        CoerGrid,
        CoerList,
        CoerMenuOption,
        CoerModal,
        CoerNumberBox,
        CoerPageTitle,
        CoerSidenav,
        CoerSelectbox,
        CoerSwitch,
        CoerTab,
        CoerTextarea,
        CoerTextBox,
        CoerToolbar,
        CoerTreeAccordion
    ],
    exports: [
        CoerAccordion,
        CoerButton,
        CoerCheckbox,
        CoerFilebox,
        CoerForm,
        CoerGrid,
        CoerList,
        CoerModal,
        CoerNumberBox,
        CoerPageTitle,
        CoerSidenav,
        CoerSelectbox,
        CoerSwitch,
        CoerTab,
        CoerTextarea,
        CoerTextBox,
        CoerToolbar
    ]
})
export class ComponentsModule { }