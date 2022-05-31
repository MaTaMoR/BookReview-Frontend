import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Book, BookRequest, FilterCriteria, FilterRequest, OrderDirection, Page} from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private baseUrl: string = environment.baseUrl + "/books";

  constructor(private http: HttpClient) {
  }

  defaultRequest(): BookRequest {
    return {};
  }

  findById(id: string): Observable<Book> {
    const url = `${this.baseUrl}/search/${id}`
    return this.http.get<Book>(url);
  }

  defaultFilter(request: BookRequest = this.defaultRequest()): FilterRequest<BookRequest> {
    return {
      filter: request,
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
  }

  titleRequest(value: string): BookRequest {
    return {
      title: (value == null ? undefined : value + "%"),
      titleCriteria: FilterCriteria.LIKE
    };
  }

  byTitle(value: string): Observable<Page<Book>> {
    return this.filter(this.defaultFilter(this.titleRequest(value)));
  }

  filter(filter: FilterRequest<BookRequest>): Observable<Page<Book>> {
    const url = `${this.baseUrl}/search/filter`;

    return this.http.post<Page<Book>>(url, filter);
  }
}
