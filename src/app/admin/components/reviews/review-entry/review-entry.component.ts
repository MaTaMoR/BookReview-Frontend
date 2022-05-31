import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Review} from "../../../../shared/data/interfaces/interfaces";
import {MatDialog} from "@angular/material/dialog";
import {ReviewEditComponent} from "../review-edit/review-edit.component";

@Component({
  selector: 'app-review-entry',
  templateUrl: './review-entry.component.html',
  styleUrls: ['./review-entry.component.css']
})
export class ReviewEntryComponent {

  @Input('review') review!: Review;
  @Output('deleted') delete: EventEmitter<Review> = new EventEmitter<Review>();

  constructor(private dialog: MatDialog) { }

  onClick(): void {
    this.dialog.closeAll();
    this.dialog.open(ReviewEditComponent, {
      autoFocus: false,
      width: 'auto',
      height: 'auto',
      panelClass: 'trend-dialog',
      data: { content: this.review }
    }).afterClosed().subscribe((resp) => {
      if (resp) {
        //Si es 'true' significa que se ha borrado el review
        if (resp == true) {
          this.delete.next(this.review);
        } else {
          this.review = resp;
        }
      }
    })
  }
}
