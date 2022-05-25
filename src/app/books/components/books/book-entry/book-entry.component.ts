import {Component, Input} from '@angular/core';
import {BookResponse} from "../../../interfaces/interfaces";
import {Router} from "@angular/router";

@Component({
  selector: 'app-book-entry',
  templateUrl: './book-entry.component.html',
  styleUrls: ['./book-entry.component.css']
})
export class BookEntryComponent {

    @Input('book') book!: BookResponse;

    constructor(private router: Router) { }

    onClick(): void {
        this.router.navigate(['/book', this.book.id]);
    }
}
