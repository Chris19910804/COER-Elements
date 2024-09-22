import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPage } from './pages/main/main.component';

export const routes: Routes = [{
    path: '',
    children: [
        { path: '', component: MainPage },
        { path: '**', redirectTo: '' }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule { }