import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Pages
import { CoerButtonPage } from './pages/coer-button/coer-button.component';
import { CoerListPage } from './pages/coer-list/coer-list.component';
import { CoerGridPage } from './pages/coer-grid/coer-grid.component';

export const routes: Routes = [{
    path: '',
    children: [
        { path: 'coer-button', component: CoerButtonPage },
        { path: 'coer-grid', component: CoerGridPage },
        { path: 'coer-list', component: CoerListPage },
        { path: '**', redirectTo: '/home' }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ComponentsRoutingModule { }