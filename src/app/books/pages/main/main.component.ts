import {Component, OnInit} from '@angular/core';
import {ReviewsService} from "../../service/reviews.service";
import {ReviewResponse} from "../../interfaces/interfaces";
import {delay} from "rxjs";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: []
})
export class MainComponent implements OnInit {

    constructor(private reviewsService: ReviewsService) {

    }

    private _reviews!: ReviewResponse[];

    get reviews(): ReviewResponse[] {
        return this._reviews;
    }

    ngOnInit(): void {
        this.reviewsService.mainPage().pipe(
            delay(30000)
        ).subscribe(resp => {
            this._reviews = resp.content;
        })
    }

    isLoading(): boolean {
        return !this._reviews;
    }
}
