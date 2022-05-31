import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {
  Editorial,
  EditorialRequest,
  FilterCriteria,
  FilterRequest,
  OrderDirection,
  Page
} from "../interfaces/interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EditorialService {

  private baseUrl: string = environment.baseUrl + "/editorials";

  constructor(private http: HttpClient) {
  }

  defaultRequest(): EditorialRequest {
    return {};
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
    return {
      name: (value == null ? undefined : value + "%"),
      nameCriteria: FilterCriteria.LIKE
    };
  }

  idRequest(id: string): EditorialRequest {
    return {
      id: id
    };
  }

  byName(value: string): Observable<Page<Editorial>> {
    return this.filter(this.defaultFilter(this.nameRequest(value)));
  }

  filter(filter: FilterRequest<EditorialRequest>): Observable<Page<Editorial>> {
    const url = `${this.baseUrl}/search/filter`;

    return this.http.post<Page<Editorial>>(url, filter);
  }
}
