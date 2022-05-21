import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {FilterRequest, OrderDirection, PageResponse, ReviewRequest, ReviewResponse} from '../interfaces/interfaces';

@Injectable({
    providedIn: 'root'
})
export class ReviewsService {

    private baseUrl: string = environment.baseUrl + "/reviews";

    constructor(private http: HttpClient) {
        this.mainPage().subscribe(response => {
            console.log(response);
        });
    }

    mainPage(): Observable<PageResponse<ReviewResponse>> {
        const filter: FilterRequest<ReviewRequest> = {
            filter: {},
            page: {
                page: 0,
                size: 10,
                sort: {
                    orders: [
                        {
                            direction: OrderDirection.DESC,
                            property: "reviewDate"
                        }
                    ]
                }
            }
        };

        console.log(JSON.stringify(filter));

        return this.filterBooks(filter);
    }

    filterBooks(filter: FilterRequest<ReviewRequest>): Observable<PageResponse<ReviewResponse>> {
        const url = `${this.baseUrl}/search/filter`;

        return this.http.post<PageResponse<ReviewResponse>>(url, filter);
    }
}
