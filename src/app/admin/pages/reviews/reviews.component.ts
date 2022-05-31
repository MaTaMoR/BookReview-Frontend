import {Component} from '@angular/core';
import {Paginator} from "../../utils/utils";
import {FilterRequest, Review, ReviewRequest} from "../../../shared/data/interfaces/interfaces";
import {ReviewsService} from "../../../shared/data/services/reviews.service";
import {MatDialog} from "@angular/material/dialog";
import {ReviewEditComponent} from "../../components/reviews/review-edit/review-edit.component";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent extends Paginator<ReviewRequest, Review> {

  constructor(private reviewsService: ReviewsService, private dialog: MatDialog) {
    super(
      reviewsService.defaultFilter(),
      (request: FilterRequest<ReviewRequest>) => {
        return reviewsService.filter(request);
      });
  }

  openCreate(): void {
    this.dialog.closeAll();
    this.dialog.open(ReviewEditComponent, {
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
