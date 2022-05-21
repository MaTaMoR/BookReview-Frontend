import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {BooksService} from "../../../../books/service/books.service";
import {debounceTime, filter, finalize, map, Observable, switchMap, tap} from "rxjs";
import {BookResponse} from "../../../../books/interfaces/interfaces";

@Component({
  selector: 'app-book-tab',
  templateUrl: './book-tab.component.html',
  styleUrls: ['./book-tab.component.css']
})
export class BookTabComponent {

    public bookControl = new FormControl();
    public bookFilter: Observable<BookResponse[]>;
    public input: string = "";
    public isSearching: boolean = false;

    constructor(private bookService: BooksService) {
        this.bookFilter = this.bookControl.valueChanges.pipe(
            filter(value => { return value.length > 0}),
            debounceTime(100),
            tap(() => {
                this.isSearching = true;
            }),
            debounceTime(200),
            switchMap(value => {
                return this.searchBook(value).pipe(
                    finalize(() => this.isSearching = false)
                )
            })
        );
    }

    buscar(): void {
        //El concepto es el siguiente: si clicas en opción vas directamente al detalle, si no vas al listado de libros de respuesta del filtro
    }

    selected(book: BookResponse): void {
        //Redirigir el usuario a la página del libro
    }

    searchBook(value: string): Observable<BookResponse[]> {
        return this.bookService.byTitle(value).pipe(
            map(resp => {
                return resp.content;
            })
        )
    }
}
