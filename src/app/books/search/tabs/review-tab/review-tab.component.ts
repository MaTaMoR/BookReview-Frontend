import {Component, ViewChild} from '@angular/core';
import {SingleAutoCompleter} from "../../../../shared/utils/utils";
import {Review} from "../../../../shared/data/interfaces/interfaces";
import {
  SingleAutoCompleterComponent
} from "../../../../shared/components/single-auto-completer/single-auto-completer.component";
import {Router} from "@angular/router";
import {map} from "rxjs";
import {ReviewsService} from "../../../../shared/data/services/reviews.service";

@Component({
  selector: 'app-review-tab',
  templateUrl: './review-tab.component.html',
  styleUrls: ['./review-tab.component.css']
})
export class ReviewTabComponent {

  reviewCompleter: SingleAutoCompleter<Review>;
  @ViewChild('input') singleCompleter!: SingleAutoCompleterComponent<Review>;

  constructor(private reviewsService: ReviewsService, private router: Router) {
    this.reviewCompleter = new SingleAutoCompleter<Review>((key) => {
      return this.reviewsService.byTitle(key).pipe(
        map(resp => {
          return resp.content;
        })
      )
    }, (key) => {
      return key.book.title;
    }, false);

    this.reviewCompleter.listenChanges((result => {
      router.navigate(['/review', result.id]);
    }));
  }

  buscar(): void {
    const input = this.singleCompleter.input;
    const request = this.reviewsService.titleRequest(input);

    this.router.navigate(['/reviews'], {queryParams: {request: btoa(JSON.stringify(request))}});
  }
}
