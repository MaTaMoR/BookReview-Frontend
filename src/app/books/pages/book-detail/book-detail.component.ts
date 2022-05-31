import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Book, BookRequest, Category, CategoryRequest} from "../../../shared/data/interfaces/interfaces";
import {BooksService} from "../../../shared/data/services/books.service";
import {CategoryService} from "../../../shared/data/services/category.service";
import {AutorService} from "../../../shared/data/services/autor.service";
import {EditorialService} from "../../../shared/data/services/editorial.service";

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent {

  book!: Book;

  constructor(private router: Router, private route: ActivatedRoute, private booksService: BooksService, private categoryService: CategoryService, private autorService: AutorService, private editorialService: EditorialService) {
    const id = this.route.snapshot.params['id'];

    booksService.findById(id).subscribe(result => {
      this.book = result;
    })
  }

  searchCategory(category: Category) {
    const requests: CategoryRequest[] = [];
    const request: BookRequest = {
      categories: [this.categoryService.nameRequest(category.name)]
    }

    this.router.navigate(['/books'], {queryParams: {request: btoa(JSON.stringify(request))}});
  }

  searchAutor(): void {
    const request: BookRequest = {
      autor: this.autorService.idRequest(this.book.autor.id)
    }

    this.router.navigate(['/books'], {queryParams: {request: btoa(JSON.stringify(request))}});
  }

  searchEditorial(): void {
    const request: BookRequest = {
      editorial: this.editorialService.idRequest(this.book.editorial.id)
    }

    this.router.navigate(['/books'], {queryParams: {request: btoa(JSON.stringify(request))}});
  }
}
