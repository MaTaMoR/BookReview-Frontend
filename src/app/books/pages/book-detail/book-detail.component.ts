import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {
    AutorResponse,
    BookRequest,
    BookResponse,
    CategoryRequest,
    CategoryResponse,
    FilterCriteria
} from "../../interfaces/interfaces";
import {BooksService} from "../../services/books.service";
import {CategoriesService} from "../../services/categories.service";
import {AutorService} from "../../services/autor.service";

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent {

    book!: BookResponse;

    constructor(private router: Router, private route: ActivatedRoute, private booksService: BooksService, private categoryService: CategoriesService, private autorService: AutorService) {
        const id = this.route.snapshot.params['id'];

        booksService.findById(id).subscribe(result => {
            this.book = result;
        })
    }

    searchCategory(category: CategoryResponse) {
        const requests: CategoryRequest[] = [];
        const request: BookRequest = {
            categories: [this.categoryService.nameRequest(category.name)]
        }

        this.router.navigate(['/books'], { queryParams: { request: btoa(JSON.stringify(request)) } });
    }

    searchAutor(): void {
        const request: BookRequest = {
            autor: this.autorService.idRequest(this.book.autor.id)
        }

        this.router.navigate(['/books'], { queryParams: { request: btoa(JSON.stringify(request)) } });
    }
}
