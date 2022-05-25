import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component'
import {LoadingComponent} from './loading/loading.component';
import {MaterialModule} from '../material/material.module';
import {FlexLayoutModule} from "@angular/flex-layout";
import {SearchComponent} from './search/search.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CategorySelectorComponent} from './search/selectors/category-selector/category-selector.component';
import {BookTabComponent} from './search/tabs/book-tab/book-tab.component';
import {SingleAutoCompleterComponent} from './components/single-auto-completer/single-auto-completer.component';
import {BannerComponent} from "./components/banner/banner.component";
import { VarDirective } from './utils/directives.directive';
import { ImagePipe } from './utils/image.pipe';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TitleComponent } from './components/title/title.component';
import { ProfileComponent } from './components/profile/profile.component';
import {AuthComponent} from "./auth/auth.component";
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileNavbarComponent } from './components/profile-navbar/profile-navbar.component';
import { SidenavNavbarComponent } from './components/sidenav-navbar/sidenav-navbar.component';
import { CategoryTabComponent } from './search/tabs/category-tab/category-tab.component';
import { MultiAutoCompleterComponent } from './components/multi-auto-completer/multi-auto-completer.component';
import { ReviewTabComponent } from './search/tabs/review-tab/review-tab.component';
import { AutorTabComponent } from './search/tabs/autor-tab/autor-tab.component';
import { EditorialTabComponent } from './search/tabs/editorial-tab/editorial-tab.component';

@NgModule({
    declarations: [
        NavbarComponent,
        LoadingComponent,
        SearchComponent,
        CategorySelectorComponent,
        BookTabComponent,
        SingleAutoCompleterComponent,
        BannerComponent,
        VarDirective,
        ImagePipe,
        SidenavComponent,
        TitleComponent,
        ProfileComponent,
        AuthComponent,
        LoginComponent,
        RegisterComponent,
        ProfileNavbarComponent,
        SidenavNavbarComponent,
        CategoryTabComponent,
        MultiAutoCompleterComponent,
        ReviewTabComponent,
        AutorTabComponent,
        EditorialTabComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        NavbarComponent,
        LoadingComponent,
        BannerComponent,
        VarDirective,
        ImagePipe,
        SidenavComponent
    ]
})
export class SharedModule {
}
