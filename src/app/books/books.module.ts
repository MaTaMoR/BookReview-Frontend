import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BooksRoutingModule} from './books-routing.module';
import {MainComponent} from './pages/main/main.component';
import {SharedModule} from '../shared/shared.module';
import {BannerComponent} from '../shared/components/banner/banner.component';
import {MaterialModule} from '../material/material.module';
import {FlexLayoutModule} from "@angular/flex-layout";
import { SliderComponent } from './components/reviews/slider/slider.component';
import {CarouselModule} from "ngx-owl-carousel-o";
import {SwiperModule} from "swiper/angular";
import { ReviewDetailComponent } from './pages/review-detail/review-detail.component';
import { BookDetailComponent } from './pages/book-detail/book-detail.component'
import {NgbRatingModule} from "@ng-bootstrap/ng-bootstrap";
import {BookEntryComponent} from "./components/books/book-entry/book-entry.component";
import {MatPaginatorIntl} from "@angular/material/paginator";
import {CustomMatPaginatorIntl} from "../shared/utils/utils";
import {BooksComponent} from "./pages/books/books.component";
import { ReviewEntryComponent } from './components/reviews/review-entry/review-entry.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { AutorEntryComponent } from './components/autor/autor-entry/autor-entry.component';
import { AutorsComponent } from './pages/autors/autors.component';

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
        AutorsComponent
    ],
    exports: [
        BannerComponent
    ],
    imports: [
        CommonModule,
        BooksRoutingModule,
        SharedModule,
        MaterialModule,
        FlexLayoutModule,
        CarouselModule,
        SwiperModule,
        NgbRatingModule
    ],
    providers: [{provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl}]
})
export class BooksModule {
}
