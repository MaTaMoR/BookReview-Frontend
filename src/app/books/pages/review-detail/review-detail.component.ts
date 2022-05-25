import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ReviewsService} from "../../services/reviews.service";
import {ReviewResponse} from "../../interfaces/interfaces";

@Component({
  selector: 'app-review-detail',
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.css']
})
export class ReviewDetailComponent {

    review!: ReviewResponse;

    constructor(private route: ActivatedRoute, private reviewService: ReviewsService) {
        const id = this.route.snapshot.params['id'];

        reviewService.findById(id).subscribe(result => {
            this.review = result;
        })
    }
}


