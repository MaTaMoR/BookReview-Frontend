import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  BookRequest,
  Category,
  CategoryRequest,
  FilterCriteria,
  FilterRequest,
  OrderDirection,
  Page,
} from "../interfaces/interfaces";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl: string = environment.baseUrl + "/categories";

  constructor(private http: HttpClient) {
  }

  defaultRequest() {
    return {};
  }

  nameRequest(value: string): CategoryRequest {
    return {
      name: (value == null ? undefined : value + "%"),
      nameCriteria: FilterCriteria.LIKE
    };
  }

  idRequest(id: string): CategoryRequest {
    return {
      id: id
    };
  }

  byName(value: string): Observable<Page<Category>> {
    return this.filter(this.defaultFilter(this.nameRequest(value)));
  }

  defaultFilter(request: CategoryRequest = this.defaultRequest()): FilterRequest<BookRequest> {
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

  filter(filter: FilterRequest<CategoryRequest>): Observable<Page<Category>> {
    const url = `${this.baseUrl}/search/filter`;

    return this.http.post<Page<Category>>(url, filter);
  }
}
