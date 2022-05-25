import { Component } from '@angular/core';
import {
    FilterRequest,
    PageResponse,
    ReviewRequest,
    ReviewResponse
} from "../../interfaces/interfaces";
import {PageEvent} from "@angular/material/paginator";
import {ReviewsService} from "../../services/reviews.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent  {

    filter!: FilterRequest<ReviewRequest>;
    pageSizeOptions: number[] = [ 5, 10, 20];
    pageResponse!: PageResponse<ReviewResponse>;

    constructor(private reviewService: ReviewsService, private route: ActivatedRoute) {
        this.route.queryParams.subscribe((params: Params) => {
            const request = params['request'];
            if (request) {
                this.filter = reviewService.defaultFilter(JSON.parse(atob(request)));
            } else {
                this.filter = reviewService.defaultFilter();
            }

            reviewService.filter(this.filter).subscribe((resp) => {
                this.pageResponse = resp;
            })
        })
    }

    totalPages(): number {
        const totalElements = this.pageResponse.page.totalElements;
        const pageSize = this.pageResponse.page.size;

        return totalElements / pageSize;
    }

    totalElements(): number {
        return this.pageResponse.page.totalElements;
    }

    currentPage() {
        return this.pageResponse.page.page;
    }

    pageSize(): number {
        return this.pageResponse.page.size;
    }

    resize(event: PageEvent): void {
        this.filter.page.size = event.pageSize;
        this.filter.page.page = event.pageIndex;

        this.reviewService.filter(this.filter).subscribe((resp) => {
            this.pageResponse = resp;
        })
    }
}
