import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
    path: '',
    children: [
        {
            path: 'components',
            loadChildren: () => import('./submodules/components/components.submodule').then(module => module.ComponentsSubmodule)
        },
        {
            path: 'directives',
            loadChildren: () => import('./submodules/directives/directives.submodule').then(module => module.DirectivesSubmodule)
        },
        {
            path: 'interfaces',
            loadChildren: () => import('./submodules/interfaces/interfaces.submodule').then(module => module.InterfacesSubmodule)
        },
        {
            path: 'pipes',
            loadChildren: () => import('./submodules/pipes/pipes.submodule').then(module => module.PipesSubmodule)
        },
        {
            path: 'signals',
            loadChildren: () => import('./submodules/signals/signals.submodule').then(module => module.SignalsSubmodule)
        },
        {
            path: 'styles',
            loadChildren: () => import('./submodules/styles/styles.submodule').then(module => module.StylesSubmodule)
        },
        {
            path: 'tools',
            loadChildren: () => import('./submodules/tools/tools.submodule').then(module => module.ToolsSubmodule)
        },
        { path: '**', redirectTo: 'home' }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FrontEndModule { }