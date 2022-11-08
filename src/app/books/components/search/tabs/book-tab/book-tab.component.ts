import {Component, ViewChild} from '@angular/core';
import {BooksService} from "../../../../../shared/data/services/books.service";
import {map} from "rxjs";
import {Book} from "../../../../../shared/data/interfaces/interfaces";
import {SingleAutoCompleter} from "../../../../../shared/utils/utils";
import {Router} from "@angular/router";
import {
  SingleAutoCompleterComponent
} from "../../../../../shared/components/single-auto-completer/single-auto-completer.component";

@Component({
  selector: 'app-book-tab',
  templateUrl: './book-tab.component.html',
  styleUrls: ['./book-tab.component.css']
})
export class BookTabComponent {

  bookCompleter: SingleAutoCompleter<Book>;
  @ViewChild('input') singleCompleter!: SingleAutoCompleterComponent<Book>;

  constructor(private bookService: BooksService, private router: Router) {
    this.bookCompleter = new SingleAutoCompleter<Book>((key) => {
      return this.bookService.byTitle(key).pipe(
        map(resp => {
          return resp.content;
        })
      )
    }, (key) => {
      return key.title;
    }, false);

    this.bookCompleter.listenChanges((result => {
      router.navigate(['/book', result.id]);
    }));
  }

  buscar(): void {
    const input = this.singleCompleter.input;
    const request = this.bookService.titleRequest(input);

    this.router.navigate(['/books'], {queryParams: {request: btoa(JSON.stringify(request))}});
  }
}
