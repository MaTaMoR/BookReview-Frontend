import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './pages/main/main.component';
import {MaterialModule} from "../material/material.module";
import {AdminRoutingModule} from "./admin-routing.model";
import {BooksComponent} from './pages/books/books.component';
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {FlexModule} from "@angular/flex-layout";
import {SharedModule} from "../shared/shared.module";
import {BookEntryComponent} from "./components/books/book-entry/book-entry.component";
import {BookEditComponent} from './components/books/book-edit/book-edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UploadComponent} from '../shared/components/upload/upload.component';
import {ReviewsComponent} from './pages/reviews/reviews.component';
import {ReviewEditComponent} from "./components/reviews/review-edit/review-edit.component";
import {ReviewEntryComponent} from "./components/reviews/review-entry/review-entry.component";
import {AdminService} from "./services/admin.service";
import {AutorsComponent} from './pages/autors/autors.component';
import {AutorEntryComponent} from './components/autors/autor-entry/autor-entry.component';
import {AutorEditComponent} from './components/autors/autor-edit/autor-edit.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CategoryEntryComponent } from './components/categories/category-entry/category-entry.component';
import { CategoryEditComponent } from './components/categories/category-edit/category-edit.component';
import { EditorialEntryComponent } from './components/editorials/editorial-entry/editorial-entry.component';
import { EditorialEditComponent } from './components/editorials/editorial-edit/editorial-edit.component';
import { EditorialsComponent } from './pages/editorials/editorials.component';

@NgModule({
  declarations: [
    MainComponent,
    BooksComponent,
    SidenavComponent,
    BookEntryComponent,
    BookEditComponent,
    UploadComponent,
    ReviewsComponent,
    ReviewEditComponent,
    ReviewEntryComponent,
    AutorsComponent,
    AutorEntryComponent,
    AutorEditComponent,
    CategoriesComponent,
    CategoryEntryComponent,
    CategoryEditComponent,
    EditorialEntryComponent,
    EditorialEditComponent,
    EditorialsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FlexModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AdminService]
})
export class AdminModule {

}
