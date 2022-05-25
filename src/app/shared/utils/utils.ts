import {debounceTime, delay, distinctUntilChanged, map, Observable, Observer, startWith, Subject, tap} from "rxjs";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl, FormGroup} from "@angular/forms";
import {MatPaginatorIntl} from "@angular/material/paginator";
import {Injectable} from "@angular/core";
import {CategoryResponse} from "../../books/interfaces/interfaces";

export abstract class DataProvider<T> {

    abstract findData(key: string): Observable<T[]>;
    abstract toString(key: T): string;

}

export class AutoCompleter<T> {

    readonly _provider: (value: string) => Observable<T[]>;
    readonly _mapper: (value: T) => string;

    private _results: T[] = [];
    private _loading: boolean = false;

    protected input!: FormControl;

    constructor(provider: (value: string) => Observable<T[]>, mapper: (value: T) => string) {
        this._provider = provider;
        this._mapper = mapper;
    }

    toString(value: T) {
        return this._mapper(value);
    }

    setInput(input: FormControl) {
        this.input = input;

        input.valueChanges.pipe(
            startWith(''),
            distinctUntilChanged(),
            debounceTime(200),
            tap(() => {
                this._loading = true;
                this._results = [];
            }),
            delay(200)
        ).subscribe((value) => {
            this._provider(value).subscribe((result) => {
                this._loading = false;
                this._results = result;
            })
        })
    }

    get isLoading(): boolean {
        return this._loading;
    }

    get results(): T[] {
        return this._results;
    }
}

export class SingleAutoCompleter<T> extends AutoCompleter<T> {

    readonly separatorKeysCodes = [ENTER, COMMA] as const;

    private updateEmitter: Subject<T>;
    public updateListener: Observable<T>;

    private value?: T;

    constructor(provider: (value: string) => Observable<T[]>, mapper: (value: T) => string) {
        super(provider, mapper);

        this.updateEmitter = new Subject<T>();
        this.updateListener = this.updateEmitter.asObservable();
    }

    listenChanges(next: (value: T) => void) {
        this.updateListener.subscribe(next);
    }

    selectValue(value: T): void {
        if (this.input) {
            this.input.setValue('');
        }

        this.value = value;
        this.updateEmitter.next(value);
    }

    get selectedValue(): T | undefined {
        return this.value;
    }

    removeValue(): void {
        this.value = undefined;
    }
}

export class MultiAutoCompleter<T> extends AutoCompleter<T> {

    readonly separatorKeysCodes = [ENTER, COMMA] as const;

    private updateEmitter: Subject<T>;
    public updateListener: Observable<T>;

    private _values: T[] = [];

    constructor(provider: (value: string) => Observable<T[]>, mapper: (value: T) => string) {
        super(provider, mapper);

        this.updateEmitter = new Subject<T>();
        this.updateListener = this.updateEmitter.asObservable();
    }

    listenChanges(next: (value: T) => void) {
        this.updateListener.subscribe(next);
    }

    hasValue(value: T): boolean {
        return this._values.indexOf(value) != -1;
    }

    selectValue(value: T): void {
        if (!this.hasValue(value)) {
            this._values.push(value);
        }

        this.input.setValue('');
        this.updateEmitter.next(value);
    }

    get selectedValues() {
        return this._values;
    }

    removeValue(category: T): void {
        if (!this.hasValue(category)) {
            this._values.splice(this._values.indexOf(category), 1);
        }
    }
}


export class FormGroupHandler {

    public formGroup: FormGroup;

    constructor(formGroup: FormGroup) {
        this.formGroup = formGroup;
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
