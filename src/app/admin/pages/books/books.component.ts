import {Component} from '@angular/core';
import {Paginator} from "../../utils/utils";
import {Book, BookRequest, FilterRequest} from "../../../shared/data/interfaces/interfaces";
import {BooksService} from "../../../shared/data/services/books.service";
import {BookEditComponent} from "../../components/books/book-edit/book-edit.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent extends Paginator<BookRequest, Book> {

  constructor(private bookService: BooksService, private dialog: MatDialog) {
    super(
      bookService.defaultFilter(),
      (request: FilterRequest<BookRequest>) => {
        return bookService.filter(request);
      });
  }

  openCreate(): void {
    this.dialog.closeAll();
    this.dialog.open(BookEditComponent, {
      autoFocus: false,
      width: 'auto',
      height: 'auto',
      panelClass: 'trend-dialog',
      data: { }
    }).afterClosed().subscribe((resp) => {
      if (resp) {
        this.update();
      }
    })
  }
}
