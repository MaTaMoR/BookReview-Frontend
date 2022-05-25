import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {
    EditorialRequest,
    EditorialResponse,
    FilterCriteria,
    FilterRequest,
    OrderDirection,
    PageResponse
} from "../interfaces/interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EditorialService {

    private baseUrl: string = environment.baseUrl + "/editorials";

    constructor(private http: HttpClient) { }

    defaultRequest(): EditorialRequest {
        return  { };
    }

    defaultFilter(request: EditorialRequest = this.defaultRequest()): FilterRequest<EditorialRequest> {
        return {
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

    nameRequest(value: string): EditorialRequest {
        return  {
            name: (value == null ? undefined : value + "%"),
            nameCriteria: FilterCriteria.LIKE
        };
    }

    byName(value: string): Observable<PageResponse<EditorialResponse>> {
        return this.filter(this.defaultFilter(this.nameRequest(value)));
    }

    filter(filter: FilterRequest<EditorialRequest>): Observable<PageResponse<EditorialResponse>> {
        const url = `${this.baseUrl}/search/filter`;

        return this.http.post<PageResponse<EditorialResponse>>(url, filter);
    }
}
