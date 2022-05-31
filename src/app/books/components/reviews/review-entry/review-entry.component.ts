import {Component, Input} from '@angular/core';
import {Review} from "../../../../shared/data/interfaces/interfaces";
import {Router} from "@angular/router";

@Component({
  selector: 'app-review-entry',
  templateUrl: './review-entry.component.html',
  styleUrls: ['./review-entry.component.css']
})
export class ReviewEntryComponent {

  @Input('review') review!: Review;

  constructor(private router: Router) {
  }

  onClick(): void {
    this.router.navigate(['/review', this.review.id]);
  }
}
