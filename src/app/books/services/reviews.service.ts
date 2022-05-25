import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {
    FilterCriteria,
    FilterRequest,
    OrderDirection,
    PageResponse,
    ReviewRequest,
    ReviewResponse
} from '../interfaces/interfaces';

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

    defaultRequest(): ReviewRequest {
        return { };
    }

    titleRequest(value: string): ReviewRequest {
        return {
            book: {
                title: (value == null ? undefined : value + "%"),
                titleCriteria: FilterCriteria.LIKE
            }
        };
    }

    findById(id: string): Observable<ReviewResponse> {
        const url = `${this.baseUrl}/search/${id}`
        return this.http.get<ReviewResponse>(url);
    }

    defaultFilter(request: ReviewRequest = this.defaultRequest()): FilterRequest<ReviewRequest> {
        return {
            filter: request,
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
    }

    mainPage(): Observable<PageResponse<ReviewResponse>> {
        return this.filter(this.defaultFilter());
    }

    byTitle(value: string): Observable<PageResponse<ReviewResponse>> {
        return this.filter(this.defaultFilter(this.titleRequest(value)));
    }

    filter(filter: FilterRequest<ReviewRequest>): Observable<PageResponse<ReviewResponse>> {
        const url = `${this.baseUrl}/search/filter`;

        return this.http.post<PageResponse<ReviewResponse>>(url, filter);
    }
}
