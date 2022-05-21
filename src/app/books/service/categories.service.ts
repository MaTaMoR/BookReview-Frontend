import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {
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

    byName(value: string): Observable<PageResponse<CategoryResponse>> {
        const filter: FilterRequest<CategoryRequest> = {
            filter: {
                name: value + "%",
                nameCriteria: FilterCriteria.LIKE
            },
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

        return this.filter(filter);
    }

    defaultFilter(): Observable<PageResponse<CategoryResponse>> {
        const filter: FilterRequest<CategoryRequest> = {
            filter: {},
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

        return this.filter(filter);
    }

    filter(filter: FilterRequest<CategoryRequest>): Observable<PageResponse<CategoryResponse>> {
        const url = `${this.baseUrl}/search/filter`;

        return this.http.post<PageResponse<CategoryResponse>>(url, filter);
    }
}
