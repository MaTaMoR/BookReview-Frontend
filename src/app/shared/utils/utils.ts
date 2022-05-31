import {debounceTime, delay, distinctUntilChanged, map, Observable, startWith, Subject, tap} from "rxjs";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl, FormGroup} from "@angular/forms";
import {MatPaginatorIntl} from "@angular/material/paginator";
import {Injectable} from "@angular/core";
import {CategoryService} from "../data/services/category.service";
import {Autor, Book, Category, Editorial} from "../data/interfaces/interfaces";
import {AutorService} from "../data/services/autor.service";
import {EditorialService} from "../data/services/editorial.service";
import {BooksService} from "../data/services/books.service";

export abstract class DataProvider<T> {

  abstract findData(key: string): Observable<T[]>;

  abstract toString(key: T): string;

}

export class AutoCompleter<T> {

  readonly _provider: (value: string) => Observable<T[]>;
  readonly _mapper: (value: T) => string;
  readonly _filter: (value: T) => boolean;
  protected input!: FormControl;
  private _loading: boolean = false;

  constructor(provider: (value: string) => Observable<T[]>, mapper: (value: T) => string, filter: (value: T) => boolean) {
    this._provider = provider;
    this._mapper = mapper;
    this._filter = filter;
  }

  private _results: T[] = [];

  get results(): T[] {
    return this._results;
  }

  get isLoading(): boolean {
    return this._loading;
  }

  toString(value: T) {
    return this._mapper(value);
  }

  setInput(input: FormControl) {
    this.input = input;

    input.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      tap(() => {
        this._loading = true;
        this._results = [];
      }),
      delay(200)
    ).subscribe((value) => {
      this._provider(value).subscribe((result) => {
        this._loading = false;
        this._results = result.filter(this._filter);
      })
    })
  }

  update() {
    this._provider(this.input.value).subscribe((result) => {
      this._loading = false;
      this._results = result.filter(this._filter);
    })
  }
}

export class SingleAutoCompleter<T> extends AutoCompleter<T> {

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly setOnSelect: boolean;

  public updateListener: Observable<T>;
  private updateEmitter: Subject<T>;
  private value?: T;

  constructor(provider: (value: string) => Observable<T[]>, mapper: (value: T) => string, setOnSelect: boolean, defaultValue?: T) {
    super(provider, mapper, ((value: T) => {
      return value != this.value;
    }));

    this.setOnSelect = setOnSelect;

    if (defaultValue) {
      this.value = defaultValue;
    }

    this.updateEmitter = new Subject<T>();
    this.updateListener = this.updateEmitter.asObservable();
  }

  get selectedValue(): T | undefined {
    return this.value;
  }

  isEmpty(): boolean {
    return !this.value;
  }

  listenChanges(next: (value: T) => void) {
    this.updateListener.subscribe(next);
  }

  selectValue(value: T): void {
    if (this.input) {
      if (this.setOnSelect) {
        this.input.setValue(this.toString(value));
      } else {
        this.input.setValue('');
      }
    }

    this.value = value;
    this.updateEmitter.next(value);
    this.update();
  }

  removeValue(): void {
    this.value = undefined;
    this.update();
  }
}

export class MultiAutoCompleter<T> extends AutoCompleter<T> {

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  public updateListener: Observable<T>;
  private updateEmitter: Subject<T>;
  private _values: T[] = [];

  constructor(provider: (value: string) => Observable<T[]>, mapper: (value: T) => string, defaultValues?: T[]) {
    super(provider, mapper, ((value: T) => {
      return !this.hasValue(value);
    }));

    if (defaultValues) {
      this._values = defaultValues;
    }

    this.updateEmitter = new Subject<T>();
    this.updateListener = this.updateEmitter.asObservable();
  }

  get selectedValues() {
    return this._values;
  }

  isEmpty(): boolean {
    return this._values.length == 0;
  }

  listenChanges(next: (value: T) => void) {
    this.updateListener.subscribe(next);
  }

  hasValue(value: T): boolean {
    return this._values.findIndex((e) => {
      return this.toString(e) == this.toString(value);
    }) != -1;
  }

  selectValue(value: T): void {
    if (!this.hasValue(value)) {
      this._values.push(value);
    }

    if (this.input) {
      this.input.setValue('');
    }

    this.updateEmitter.next(value);
    this.update();
  }

  removeValue(category: T): void {
    if (this.hasValue(category)) {
      this._values.splice(this._values.indexOf(category), 1);
      this.update();
    }
  }
}

export class CategoryAutoCompleter extends MultiAutoCompleter<Category> {

  constructor(private categoryService: CategoryService, defaultValues?: Category[]) {
    super((key) => {
      return this.categoryService.byName(key).pipe(
        map(resp => {
          return resp.content;
        })
      )
    }, (key) => {
      return key.name;
    }, defaultValues);
  }
}

export class AutorAutoCompleter extends SingleAutoCompleter<Autor> {

  constructor(private autorService: AutorService, setOnSelect: boolean, defaultValue?: Autor) {
    super((key) => {
      return this.autorService.byFullName(key).pipe(
        map(resp => {
          return resp.content;
        })
      )
    }, (key) => {
      return key.name + ' ' + key.surnames;
    }, setOnSelect, defaultValue);
  }
}

export class EditorialAutoCompleter extends SingleAutoCompleter<Editorial> {

  constructor(private editorialService: EditorialService, setOnSelect: boolean, defaultValue?: Editorial) {
    super((key) => {
      return this.editorialService.byName(key).pipe(
        map(resp => {
          return resp.content;
        })
      )
    }, (key) => {
      return key.name;
    }, setOnSelect, defaultValue);
  }
}

export class BookAutoCompleter extends SingleAutoCompleter<Book> {

  constructor(private bookService: BooksService, setOnSelect: boolean, defaultValue?: Book) {
    super((key) => {
      return this.bookService.byTitle(key).pipe(
        map(resp => {
          return resp.content;
        })
      )
    }, (key) => {
      return key.title;
    }, setOnSelect, defaultValue);
  }
}

export class FormGroupHandler {

  public formGroup: FormGroup;

  constructor(formGroup: FormGroup) {
    this.formGroup = formGroup;
  }

  getValue(value: string): string {
    const formControl = this.formGroup.controls[value];
    return formControl.value;
  }

  hasError(value: string): boolean {
    const formControl = this.formGroup.controls[value];
    return formControl.touched && formControl.invalid;
  }

  getError(value: string): string {
    if (this.hasError(value)) {
      const entry = this.formGroup.controls[value];
      const errors = entry.errors;

      if (errors) {
        if (errors['required']) {
          return `¡Debes rellenar este campo!`;
        } else if (errors['minlength']) {
          return `¡El mínimo de caracteres es ${errors['minlength'].requiredLength}!`;
        } else if (errors['maxlength']) {
          return `¡El máximo de caracteres es ${errors['maxlength'].requiredLength}!`;
        }
      }
    }

    return '';
  }
}

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Items por página';
  override previousPageLabel = 'Página anterior';
  override nextPageLabel = 'Página siguiente';
  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return '0 de ' + length;
    }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = Math.min(startIndex + pageSize, length)

    return startIndex + 1 + ' - ' + endIndex + ' de ' + length;
  };
}
