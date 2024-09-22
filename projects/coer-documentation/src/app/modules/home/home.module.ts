//Modules
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home.routing';
import { SharedModule } from 'projects/coer-documentation/src/app/shared/shared.module';

//Pages
import { MainPage } from './pages/main/main.component';

@NgModule({
    declarations: [MainPage],
    imports: [SharedModule, HomeRoutingModule],
    exports: [SharedModule]
})
export class HomeModule { }