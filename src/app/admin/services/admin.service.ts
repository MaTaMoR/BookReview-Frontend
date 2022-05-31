import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Autor, Book, Category, Editorial, Review} from "../../shared/data/interfaces/interfaces";
import {catchError, map, Observable, of} from "rxjs";

@Injectable()
export class AdminService {

  private baseUrl: string = environment.baseUrl + "/admin";

  constructor(private http: HttpClient) { }

  deleteBook(id: string): Observable<boolean> {
    const url = `${this.baseUrl}/books/delete/${id}`;
    return this.http.delete<boolean>(url).pipe(
      map(() => {
        return true;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  updateOrCreateBook(book: Book): Observable<Book> {
    const url = `${this.baseUrl}/books/update-or-create`;

    return this.http.post<Book>(url, book);
  }

  deleteReview(id: string): Observable<boolean> {
    const url = `${this.baseUrl}/reviews/delete/${id}`;
    return this.http.delete<boolean>(url).pipe(
      map(() => {
        return true;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  updateOrCreateReview(review: Review): Observable<Review> {
    const url = `${this.baseUrl}/reviews/update-or-create`;

    return this.http.post<Review>(url, review);
  }

  deleteAutor(id: string): Observable<boolean> {
    const url = `${this.baseUrl}/autors/delete/${id}`;
    return this.http.delete<boolean>(url).pipe(
      map(() => {
        return true;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  updateOrCreateAutor(autor: Autor): Observable<Autor> {
    const url = `${this.baseUrl}/autors/update-or-create`;

    return this.http.post<Autor>(url, autor);
  }

  deleteCategory(id: string): Observable<boolean> {
    const url = `${this.baseUrl}/categories/delete/${id}`;
    return this.http.delete<boolean>(url).pipe(
      map(() => {
        return true;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  updateOrCreateCategory(category: Category): Observable<Category> {
    const url = `${this.baseUrl}/categories/update-or-create`;

    return this.http.post<Autor>(url, category);
  }

  deleteEditorial(id: string): Observable<boolean> {
    const url = `${this.baseUrl}/editorials/delete/${id}`;
    return this.http.delete<boolean>(url).pipe(
      map(() => {
        return true;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  updateOrCreateEditorial(editorial: Editorial): Observable<Editorial> {
    const url = `${this.baseUrl}/editorials/update-or-create`;

    return this.http.post<Editorial>(url, editorial);
  }
}
