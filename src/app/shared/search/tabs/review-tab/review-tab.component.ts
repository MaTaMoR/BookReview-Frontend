import {Component, OnInit, ViewChild} from '@angular/core';
import {SingleAutoCompleter} from "../../../utils/utils";
import {BookResponse, ReviewResponse} from "../../../../books/interfaces/interfaces";
import {SingleAutoCompleterComponent} from "../../../components/single-auto-completer/single-auto-completer.component";
import {BooksService} from "../../../../books/services/books.service";
import {Router} from "@angular/router";
import {map} from "rxjs";
import {ReviewsService} from "../../../../books/services/reviews.service";

@Component({
  selector: 'app-review-tab',
  templateUrl: './review-tab.component.html',
  styleUrls: ['./review-tab.component.css']
})
export class ReviewTabComponent {

    reviewCompleter: SingleAutoCompleter<ReviewResponse>;
    @ViewChild('input') singleCompleter!: SingleAutoCompleterComponent<ReviewResponse>;

    constructor(private reviewsService: ReviewsService, private router: Router) {
        this.reviewCompleter = new SingleAutoCompleter<ReviewResponse>((key) => {
            return this.reviewsService.byTitle(key).pipe(
                map(resp => {
                    return resp.content;
                })
            )
        }, (key) => {
            return key.book.title;
        });

        this.reviewCompleter.listenChanges((result => {
            router.navigate(['/review', result.id]);
        }));
    }

    buscar(): void {
        const input = this.singleCompleter.input;
        const request = this.reviewsService.titleRequest(input);

        this.router.navigate(['/reviews'], { queryParams: { request: btoa(JSON.stringify(request)) } });
    }
}
