import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {
    BookRequest,
    BookResponse,
    FilterCriteria,
    FilterRequest,
    OrderDirection,
    PageResponse
} from '../interfaces/interfaces';

@Injectable({
    providedIn: 'root'
})
export class BooksService {

    private baseUrl: string = environment.baseUrl + "/books";

    constructor(private http: HttpClient) { }

    byTitle(value: string): Observable<PageResponse<BookResponse>> {
        const filter: FilterRequest<BookRequest> = {
            filter: {
                title: (value == null ? undefined : value + "%"),
                titleCriteria: FilterCriteria.LIKE
            },
            page: {
                page: 0,
                size: 10,
                sort: {
                    orders: [
                        {
                            direction: OrderDirection.DESC,
                            property: "title"
                        }
                    ]
                }
            }
        };

        return this.filter(filter);
    }

    defaultFilter(): Observable<PageResponse<BookResponse>> {
        const filter: FilterRequest<BookRequest> = {
            filter: {},
            page: {
                page: 0,
                size: 10,
                sort: {
                    orders: [
                        {
                            direction: OrderDirection.DESC,
                            property: "publishedDate"
                        }
                    ]
                }
            }
        };

        return this.filter(filter);
    }

    filter(filter: FilterRequest<BookRequest>): Observable<PageResponse<BookResponse>> {
        const url = `${this.baseUrl}/search/filter`;

        return this.http.post<PageResponse<BookResponse>>(url, filter);
    }
}
