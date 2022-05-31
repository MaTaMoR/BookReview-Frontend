import {Component} from '@angular/core';
import {BookRequest, Category, CategoryRequest, FilterRequest, Page} from "../../../shared/data/interfaces/interfaces";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";
import {CategoryService} from "../../../shared/data/services/category.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  filter!: FilterRequest<CategoryRequest>;
  pageSizeOptions: number[] = [5, 10, 20];
  pageResponse!: Page<Category>;

  constructor(private categoryService: CategoryService, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params: Params) => {
      const request = params['request'];
      if (request) {
        this.filter = categoryService.defaultFilter(JSON.parse(atob(request)));
      } else {
        this.filter = categoryService.defaultFilter();
      }

      categoryService.filter(this.filter).subscribe((resp) => {
        this.pageResponse = resp;
      })
    })
  }

  totalPages(): number {
    const totalElements = this.pageResponse.page.totalElements;
    const pageSize = this.pageResponse.page.size;

    return totalElements / pageSize;
  }

  totalElements(): number {
    return this.pageResponse.page.totalElements;
  }

  currentPage() {
    return this.pageResponse.page.page;
  }

  pageSize(): number {
    return this.pageResponse.page.size;
  }

  resize(event: PageEvent): void {
    this.filter.page.size = event.pageSize;
    this.filter.page.page = event.pageIndex;

    this.categoryService.filter(this.filter).subscribe((resp) => {
      this.pageResponse = resp;
    })
  }

  onClick(editorial: Category): void {
    const request: BookRequest = {
      categories: [this.categoryService.idRequest(editorial.id)]
    }

    this.router.navigate(['/books'], {queryParams: {request: btoa(JSON.stringify(request))}});
  }
}
