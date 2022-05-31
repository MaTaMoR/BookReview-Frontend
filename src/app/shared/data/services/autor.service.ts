import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Autor, AutorRequest, FilterCriteria, FilterRequest, OrderDirection, Page} from "../interfaces/interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  private baseUrl: string = environment.baseUrl + "/autors";

  constructor(private http: HttpClient) {
  }

  defaultRequest(): AutorRequest {
    return {};
  }

  defaultFilter(request: AutorRequest = this.defaultRequest()): FilterRequest<AutorRequest> {
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
            },
            {
              direction: OrderDirection.DESC,
              property: "surnames"
            }
          ]
        }
      }
    };
  }

  idRequest(value: string): AutorRequest {
    return {
      id: value
    };
  }

  fullNameRequest(fullName: string): AutorRequest {
    return {
      fullName: (fullName == null ? undefined : fullName + "%"),
      fullNameCriteria: FilterCriteria.LIKE
    };
  }

  byFullName(value: string): Observable<Page<Autor>> {
    return this.filter(this.defaultFilter(this.fullNameRequest(value)));
  }

  filter(filter: FilterRequest<AutorRequest>): Observable<Page<Autor>> {
    const url = `${this.baseUrl}/search/filter`;

    return this.http.post<Page<Autor>>(url, filter);
  }
}
