import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Book} from "../../../../shared/data/interfaces/interfaces";
import {MatDialog} from "@angular/material/dialog";
import {BookEditComponent} from "../book-edit/book-edit.component";

@Component({
  selector: 'app-book-entry',
  templateUrl: './book-entry.component.html',
  styleUrls: ['./book-entry.component.css']
})
export class BookEntryComponent {

  @Input('book') book!: Book;
  @Output('deleted') delete: EventEmitter<Book> = new EventEmitter<Book>();

  constructor(private dialog: MatDialog) { }

  onClick(): void {
    this.dialog.closeAll();
    this.dialog.open(BookEditComponent, {
      autoFocus: false,
      width: 'auto',
      height: 'auto',
      panelClass: 'trend-dialog',
      data: { content: this.book }
    }).afterClosed().subscribe((resp) => {
      if (resp) {
        //Si es 'true' significa que se ha borrado el libro
        if (resp == true) {
          this.delete.next(this.book);
        } else {
          this.book = resp;
        }
      }
    })
  }
}
