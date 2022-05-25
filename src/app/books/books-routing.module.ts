import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './pages/main/main.component';
import {BookDetailComponent} from "./pages/book-detail/book-detail.component";
import {ReviewDetailComponent} from "./pages/review-detail/review-detail.component";
import {BooksComponent} from "./pages/books/books.component";
import {ReviewsComponent} from "./pages/reviews/reviews.component";
import {AutorsComponent} from "./pages/autors/autors.component";

const routes: Routes = [
    {
        path: '', component: MainComponent
    },
    {
        path: 'books', component: BooksComponent
    },
    {
        path: 'reviews', component: ReviewsComponent
    },
    {
        path: 'autors', component: AutorsComponent
    },
    {
        path: 'book/:id', component: BookDetailComponent
    },
    {
        path: 'review/:id', component: ReviewDetailComponent
    },
    {
        path: '**', redirectTo: ''
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BooksRoutingModule {
}
