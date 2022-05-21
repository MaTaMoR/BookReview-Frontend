import {Component, Input} from '@angular/core';
import {ReviewResponse} from 'src/app/books/interfaces/interfaces';

@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrls: []
})
export class BannerComponent {

    constructor() {
    }

    @Input("reviews") _reviews!: ReviewResponse[];

    get reviews(): ReviewResponse[] {
        return this._reviews;
    }

    onClick(review: ReviewResponse): void {
        console.log(review);
    }
}
