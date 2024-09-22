import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'components',
        loadChildren: () => import('./modules/components/components.module').then(module => module.ComponentsModule)
    },
    {
        path: 'directives',
        loadChildren: () => import('./modules/directives/directives.module').then(module => module.DirectivesModule)
    },
    {
        path: 'home',
        loadChildren: () => import('./modules/home/home.module').then(module => module.HomeModule)
    },
    {
        path: 'interfaces',
        loadChildren: () => import('./modules/interfaces/interfaces.module').then(module => module.InterfacesModule)
    },
    {
        path: 'pipes',
        loadChildren: () => import('./modules/pipes/pipes.module').then(module => module.PipesModule)
    },
    {
        path: 'signals',
        loadChildren: () => import('./modules/signals/signals.module').then(module => module.SignalsModule)
    },
    {
        path: 'styles',
        loadChildren: () => import('./modules/styles/styles.module').then(module => module.StylesModule)
    },
    {
        path: 'tools',
        loadChildren: () => import('./modules/tools/tools.module').then(module => module.ToolsModule)
    },
    { path: '**', redirectTo: 'home' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
})
export class AppRoutingModule { }