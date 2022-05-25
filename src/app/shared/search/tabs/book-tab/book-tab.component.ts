import {Component, ViewChild} from '@angular/core';
import {BooksService} from "../../../../books/services/books.service";
import {map} from "rxjs";
import {BookResponse} from "../../../../books/interfaces/interfaces";
import {SingleAutoCompleter} from "../../../utils/utils";
import {Router} from "@angular/router";
import {SingleAutoCompleterComponent} from "../../../components/single-auto-completer/single-auto-completer.component";

@Component({
  selector: 'app-book-tab',
  templateUrl: './book-tab.component.html',
  styleUrls: ['./book-tab.component.css']
})
export class BookTabComponent {

    bookCompleter: SingleAutoCompleter<BookResponse>;
    @ViewChild('input') singleCompleter!: SingleAutoCompleterComponent<BookResponse>;

    constructor(private bookService: BooksService, private router: Router) {
        this.bookCompleter = new SingleAutoCompleter<BookResponse>((key) => {
            return this.bookService.byTitle(key).pipe(
                map(resp => {
                    return resp.content;
                })
            )
        }, (key) => {
            return key.title;
        });

        this.bookCompleter.listenChanges((result => {
            router.navigate(['/book', result.id]);
        }));
    }

    buscar(): void {
        const input = this.singleCompleter.input;
        const request = this.bookService.titleRequest(input);

        this.router.navigate(['/books'], { queryParams: { request: btoa(JSON.stringify(request)) } });
    }
}
