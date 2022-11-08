import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './pages/main/main.component';
import {BookDetailComponent} from "./pages/book-detail/book-detail.component";
import {ReviewDetailComponent} from "./components/review-detail/review-detail.component";
import {BooksComponent} from "./pages/books/books.component";
import {ReviewsComponent} from "./pages/reviews/reviews.component";
import {AutorsComponent} from "./pages/autors/autors.component";
import {EditorialsComponent} from "./pages/editorials/editorials.component";
import {CategoriesComponent} from "./pages/categories/categories.component";
import {HomeComponent} from "./pages/home/home.component";

const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      {
        path: '', component: HomeComponent
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
        path: 'editorials', component: EditorialsComponent
      },
      {
        path: 'categories', component: CategoriesComponent
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule {
}
