import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component'
import {SidebarComponent} from './sidebar/sidebar.component';
import {AuthModule} from '../auth/auth.module';
import {LoadingComponent} from './loading/loading.component';
import {MaterialModule} from '../material/material.module';
import {FlexLayoutModule} from "@angular/flex-layout";
import {SearchComponent} from './search/search.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CategorySelectorComponent} from './search/selectors/category-selector/category-selector.component';
import {BookTabComponent} from './search/tabs/book-tab/book-tab.component';

@NgModule({
    declarations: [
        NavbarComponent,
        SidebarComponent,
        LoadingComponent,
        SearchComponent,
        CategorySelectorComponent,
        BookTabComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        AuthModule,
        MaterialModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        NavbarComponent,
        SidebarComponent,
        LoadingComponent
    ]
})
export class SharedModule {
}
