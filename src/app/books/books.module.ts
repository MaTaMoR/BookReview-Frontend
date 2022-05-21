import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BooksRoutingModule} from './books-routing.module';
import {MainComponent} from './pages/main/main.component';
import {SharedModule} from '../shared/shared.module';
import {BannerComponent} from './components/reviews/banner/banner.component';
import {MaterialModule} from '../material/material.module';
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
    declarations: [
        MainComponent,
        BannerComponent
    ],
    imports: [
        CommonModule,
        BooksRoutingModule,
        SharedModule,
        MaterialModule,
        FlexLayoutModule
    ]
})
export class BooksModule {
}
