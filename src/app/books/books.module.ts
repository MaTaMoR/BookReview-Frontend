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
import {ReviewDetailComponent} from './pages/review-detail/review-detail.component';
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
import {ProfileNavbarComponent} from "./components/profile-navbar/profile-navbar.component";
import {SidenavNavbarComponent} from "./components/sidenav-navbar/sidenav-navbar.component";
import {TitleComponent} from "./components/title/title.component";
import {SearchComponent} from "./search/search.component";
import {BookTabComponent} from "./search/tabs/book-tab/book-tab.component";
import {ReviewTabComponent} from "./search/tabs/review-tab/review-tab.component";
import {AutorTabComponent} from "./search/tabs/autor-tab/autor-tab.component";
import {EditorialTabComponent} from "./search/tabs/editorial-tab/editorial-tab.component";
import {SidenavComponent} from "./sidenav/sidenav.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {FooterComponent} from "./components/footer/footer.component";
import {AuthComponent} from "./auth/auth.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CategoryTabComponent} from "./search/tabs/category-tab/category-tab.component";

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
    ProfileNavbarComponent,
    SidenavNavbarComponent,
    TitleComponent,
    SearchComponent,
    BookTabComponent,
    ReviewTabComponent,
    AutorTabComponent,
    EditorialTabComponent,
    SidenavComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    CategoryTabComponent
  ],
  exports: [
    BannerComponent,
    SidenavComponent,
    AutorEntryComponent
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
    ReactiveFormsModule
  ],
  providers: [{provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl}]
})
export class BooksModule {
}
