import {Component} from '@angular/core';
import {BookRequest, BookResponse, FilterRequest, PageResponse} from "../../interfaces/interfaces";
import {BooksService} from "../../services/books.service";
import {PageEvent} from "@angular/material/paginator";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {filter, map} from 'rxjs'

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {

    filter!: FilterRequest<BookRequest>;
    pageSizeOptions: number[] = [ 5, 10, 20];
    pageResponse!: PageResponse<BookResponse>;

    constructor(private bookService: BooksService, private router: Router, private route: ActivatedRoute) {
        this.route.queryParams.subscribe((params: Params) => {
            const request = params['request'];
            if (request) {
                this.filter = bookService.defaultFilter(JSON.parse(atob(request)));
            } else {
                this.filter = bookService.defaultFilter();
            }

            bookService.filter(this.filter).subscribe((resp) => {
                this.pageResponse = resp;
            })
        })
    }

    totalPages(): number {
        const totalElements = this.pageResponse.page.totalElements;
        const pageSize = this.pageResponse.page.size;

        return totalElements / pageSize;
    }

    totalElements(): number {
        return this.pageResponse.page.totalElements;
    }

    currentPage() {
        return this.pageResponse.page.page;
    }

    pageSize(): number {
        return this.pageResponse.page.size;
    }

    resize(event: PageEvent): void {
        this.filter.page.size = event.pageSize;
        this.filter.page.page = event.pageIndex;

        this.bookService.filter(this.filter).subscribe((resp) => {
            this.pageResponse = resp;
        })
    }

    onClick(book: BookResponse): void {
        this.router.navigate(['/book', book.id]);
    }
}
