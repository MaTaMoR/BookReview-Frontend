import {Component, Input} from '@angular/core';
import {ReviewResponse} from "../../../interfaces/interfaces";
import {Router} from "@angular/router";

@Component({
  selector: 'app-review-entry',
  templateUrl: './review-entry.component.html',
  styleUrls: ['./review-entry.component.css']
})
export class ReviewEntryComponent {

    @Input('review') review!: ReviewResponse;

    constructor(private router: Router) {}

    onClick(): void {
        this.router.navigate(['/review', this.review.id]);
    }
}
