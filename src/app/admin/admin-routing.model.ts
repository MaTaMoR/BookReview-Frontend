import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {BooksComponent} from "./pages/books/books.component";
import {ReviewsComponent} from "./pages/reviews/reviews.component";
import {AutorsComponent} from "./pages/autors/autors.component";
import {CategoriesComponent} from "./pages/categories/categories.component";
import {EditorialsComponent} from "./pages/editorials/editorials.component";

const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      {
        path: '', component: BooksComponent
      },
      {
        path: 'reviews', component: ReviewsComponent
      },
      {
        path: 'autors', component: AutorsComponent
      },
      {
        path: 'categories', component: CategoriesComponent
      },
      {
        path: 'editorials', component: EditorialsComponent
      },
      {
        path: '**', redirectTo: ''
      }
    ]
  },
  {
    path: '**', redirectTo: ''
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {

}
