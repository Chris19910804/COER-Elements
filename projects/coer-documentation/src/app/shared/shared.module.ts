//Modules
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ComponentsModule } from './components/components.module';
import { DirectivesModule } from './directives/directives.module';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
    imports: [
        RouterOutlet,
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        CommonModule,
        RouterModule,
        RouterOutlet,
        ComponentsModule,
        DirectivesModule,
        PipesModule
    ]
})
export class SharedModule { }