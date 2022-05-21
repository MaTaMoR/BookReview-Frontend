import {Component, Input} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {debounceTime, filter, finalize, map, Observable, switchMap, tap} from "rxjs";
import {CategoryResponse} from "../../../../books/interfaces/interfaces";
import {CategoriesService} from "../../../../books/service/categories.service";

@Component({
    selector: 'app-category-selector',
    templateUrl: './category-selector.component.html',
    styleUrls: ['./category-selector.component.css']
})
export class CategorySelectorComponent {

    public categoryControl = new FormControl();
    public categoryFilter: Observable<CategoryResponse[]>;
    public isSearching: boolean = false;

    @Input('categories') categories: CategoryResponse[] = [];

    constructor(private fb: FormBuilder, private categoriesService: CategoriesService) {
        this.categoryFilter = this.categoryControl.valueChanges.pipe(
            filter(value => {
                return value != null && value.length > 0;
            }),
            debounceTime(100),
            tap(() => {
                this.isSearching = true;
            }),
            debounceTime(200),
            switchMap(value => {
                return this.searchCategory(value).pipe(
                    finalize(() => this.isSearching = false)
                )
            })
        );
    }

    hasCategory(value: CategoryResponse): boolean {
        return this.categories.findIndex(e => {
            return e.name == value.name;
        }) != -1;
    }

    searchCategory(value: string): Observable<CategoryResponse[]> {
        return this.categoriesService.byName(value)
            .pipe(
                map(resp => {
                    return resp.content.filter(e => !this.hasCategory(e));
                }),
            );
    }

    addCategory(category: CategoryResponse): void {
        if (!this.hasCategory(category)) {
            this.categories.push(category);
        }

        this.categoryControl.setValue('');
    }

    removeCategory(category: CategoryResponse): void {
        if (!this.hasCategory(category)) {
            this.categories.splice(this.categories.indexOf(category), 1);
        }
    }
}
