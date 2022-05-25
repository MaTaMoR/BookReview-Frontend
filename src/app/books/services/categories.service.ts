import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {
    BookRequest,
    CategoryRequest,
    CategoryResponse,
    FilterCriteria,
    FilterRequest,
    OrderDirection,
    PageResponse,
} from "../interfaces/interfaces";

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {

    private baseUrl: string = environment.baseUrl + "/categories";

    constructor(private http: HttpClient) {
    }

    defaultRequest() {
        return { };
    }

    nameRequest(value: string): CategoryRequest {
        return {
            name: (value == null ? undefined : value + "%"),
            nameCriteria: FilterCriteria.LIKE
        };
    }

    byName(value: string): Observable<PageResponse<CategoryResponse>> {
        return this.filter(this.defaultFilter(this.nameRequest(value)));
    }

    defaultFilter(request: CategoryRequest = this.defaultRequest()): FilterRequest<BookRequest> {
        return  {
            filter: request,
            page: {
                page: 0,
                size: 10,
                sort: {
                    orders: [
                        {
                            direction: OrderDirection.DESC,
                            property: "name"
                        }
                    ]
                }
            }
        };
    }

    filter(filter: FilterRequest<CategoryRequest>): Observable<PageResponse<CategoryResponse>> {
        const url = `${this.baseUrl}/search/filter`;

        return this.http.post<PageResponse<CategoryResponse>>(url, filter);
    }
}
