import {Component, ViewChild} from '@angular/core';
import {MultiAutoCompleter} from "../../../utils/utils";
import {BookRequest, CategoryRequest, CategoryResponse, FilterCriteria} from "../../../../books/interfaces/interfaces";
import {Router} from "@angular/router";
import {map} from "rxjs";
import {CategoriesService} from "../../../../books/services/categories.service";
import {MultiAutoCompleterComponent} from "../../../components/multi-auto-completer/multi-auto-completer.component";

@Component({
  selector: 'app-category-tab',
  templateUrl: './category-tab.component.html',
  styleUrls: ['./category-tab.component.css']
})
export class CategoryTabComponent {

    categoryCompleter: MultiAutoCompleter<CategoryResponse>;
    @ViewChild('input') singleCompleter!: MultiAutoCompleterComponent<CategoryResponse>;
    inclusiveSearch: boolean = true;

    constructor(private categoryService: CategoriesService, private router: Router) {
        this.categoryCompleter = new MultiAutoCompleter<CategoryResponse>((key) => {
            return this.categoryService.byName(key).pipe(
                map(resp => {
                    return resp.content;
                })
            )
        }, (key) => {
            return key.name;
        });
    }

    buscar(): void {
        const requests: CategoryRequest[] = [];
        for (let category of this.categoryCompleter.selectedValues) {
            requests.push(this.categoryService.nameRequest(category.name));
        }

        const request: BookRequest = {
            categories: requests,
            categoriesCriteria: (this.inclusiveSearch ? FilterCriteria.AND : FilterCriteria.OR)
        }

        this.router.navigate(['/books'], { queryParams: { request: btoa(JSON.stringify(request)) } });
    }
}
