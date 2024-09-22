import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoerButtonPage } from './pages/coer-button/coer-button.component';

export const routes: Routes = [{
    path: '',
    children: [
        { path: 'coer-button', component: CoerButtonPage },
        { path: '**', redirectTo: '/home' }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ComponentsRoutingModule { }