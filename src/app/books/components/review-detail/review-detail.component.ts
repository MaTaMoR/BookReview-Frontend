import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ReviewsService} from "../../../shared/data/services/reviews.service";
import {BookRequest, Review} from "../../../shared/data/interfaces/interfaces";
import {AutorService} from "../../../shared/data/services/autor.service";

@Component({
  selector: 'app-review-detail',
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.css']
})
export class ReviewDetailComponent {

  review!: Review;

  constructor(private router: Router, private route: ActivatedRoute, private reviewService: ReviewsService, private autorService: AutorService) {
    const id = this.route.snapshot.params['id'];

    reviewService.findById(id).subscribe(result => {
      this.review = result;
    })
  }

  searchAutor(): void {
    const request: BookRequest = {
      autor: this.autorService.idRequest(this.review.book.autor.id)
    }

    this.router.navigate(['/books'], {queryParams: {request: btoa(JSON.stringify(request))}});
  }
}


