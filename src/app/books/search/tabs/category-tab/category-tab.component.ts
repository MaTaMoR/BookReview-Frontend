import {Component, ViewChild} from '@angular/core';
import {MultiAutoCompleter} from "../../../../shared/utils/utils";
import {BookRequest, Category, CategoryRequest, FilterCriteria} from "../../../../shared/data/interfaces/interfaces";
import {Router} from "@angular/router";
import {map} from "rxjs";
import {CategoryService} from "../../../../shared/data/services/category.service";
import {
  MultiAutoCompleterComponent
} from "../../../../shared/components/multi-auto-completer/multi-auto-completer.component";

@Component({
  selector: 'app-category-tab',
  templateUrl: './category-tab.component.html',
  styleUrls: ['./category-tab.component.css']
})
export class CategoryTabComponent {

  categoryCompleter: MultiAutoCompleter<Category>;
  @ViewChild('input') singleCompleter!: MultiAutoCompleterComponent<Category>;
  inclusiveSearch: boolean = true;

  constructor(private categoryService: CategoryService, private router: Router) {
    this.categoryCompleter = new MultiAutoCompleter<Category>((key) => {
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

    this.router.navigate(['/books'], {queryParams: {request: btoa(JSON.stringify(request))}});
  }
}
