import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'front-end',
        loadChildren: () => import('./modules/front-end/front-end.module').then(module => module.FrontEndModule)
    },
    {
        path: 'home',
        loadChildren: () => import('./modules/home/home.module').then(module => module.HomeModule)
    },
    { path: '**', redirectTo: 'home' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
})
export class AppRoutingModule { }