import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BooksRoutingModule} from './books-routing.module';
import {MainComponent} from './pages/main/main.component';
import {SharedModule} from '../shared/shared.module';
import {BannerComponent} from './components/banner/banner.component';
import {MaterialModule} from '../material/material.module';
import {FlexLayoutModule} from "@angular/flex-layout";
import {SliderComponent} from './components/reviews/slider/slider.component';
import {CarouselModule} from "ngx-owl-carousel-o";
import {SwiperModule} from "swiper/angular";
import {ReviewDetailComponent} from './components/review-detail/review-detail.component';
import {BookDetailComponent} from './pages/book-detail/book-detail.component'
import {NgbRatingModule} from "@ng-bootstrap/ng-bootstrap";
import {BookEntryComponent} from "./components/books/book-entry/book-entry.component";
import {MatPaginatorIntl} from "@angular/material/paginator";
import {CustomMatPaginatorIntl} from "../shared/utils/utils";
import {BooksComponent} from "./pages/books/books.component";
import {ReviewEntryComponent} from './components/reviews/review-entry/review-entry.component';
import {ReviewsComponent} from './pages/reviews/reviews.component';
import {AutorEntryComponent} from './components/autor/autor-entry/autor-entry.component';
import {AutorsComponent} from './pages/autors/autors.component';
import {EditorialEntryComponent} from './components/editorial/editorial-entry/editorial-entry.component';
import {EditorialsComponent} from './pages/editorials/editorials.component';
import {CategoriesComponent} from './pages/categories/categories.component';
import {CategoryEntryComponent} from './components/categories/category-entry/category-entry.component';
import {HomeComponent} from './pages/home/home.component';
import {TitleComponent} from "./components/title/title.component";
import {SearchComponent} from "./components/search/search.component";
import {BookTabComponent} from "./components/search/tabs/book-tab/book-tab.component";
import {ReviewTabComponent} from "./components/search/tabs/review-tab/review-tab.component";
import {AutorTabComponent} from "./components/search/tabs/autor-tab/autor-tab.component";
import {EditorialTabComponent} from "./components/search/tabs/editorial-tab/editorial-tab.component";
import {FooterComponent} from "./components/footer/footer.component";
import {AuthComponent} from "./auth/auth.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CategoryTabComponent} from "./components/search/tabs/category-tab/category-tab.component";
import {ProfileComponent} from './components/profile/profile.component';
import {NavbarProfileComponent} from "./components/navbar-profile/navbar-profile.component";
import {SidenavNavbarComponent} from "./components/sidenav-navbar/sidenav-navbar.component";
import {SidenavProfileComponent} from "./components/sidenav-profile/sidenav-profile.component";
import {SidenavComponent} from "./components/sidenav/sidenav.component";
import {NavbarComponent} from "./components/navbar/navbar.component";

@NgModule({
  declarations: [
    MainComponent,
    SliderComponent,
    ReviewDetailComponent,
    BookDetailComponent,
    BooksComponent,
    BookEntryComponent,
    ReviewEntryComponent,
    ReviewsComponent,
    AutorEntryComponent,
    AutorsComponent,
    EditorialEntryComponent,
    EditorialsComponent,
    CategoriesComponent,
    CategoryEntryComponent,
    HomeComponent,
    BannerComponent,
    NavbarProfileComponent,
    SidenavNavbarComponent,
    TitleComponent,
    SearchComponent,
    BookTabComponent,
    ReviewTabComponent,
    AutorTabComponent,
    EditorialTabComponent,
    SidenavComponent,
    SidenavProfileComponent,
    NavbarComponent,
    FooterComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    CategoryTabComponent,
    ProfileComponent
  ],
    imports: [
        CommonModule,
        BooksRoutingModule,
        SharedModule,
        MaterialModule,
        FlexLayoutModule,
        CarouselModule,
        SwiperModule,
        NgbRatingModule,
        ReactiveFormsModule,
        FormsModule
    ],
  providers: [
    {provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl}
  ]
})
export class BooksModule {
}
