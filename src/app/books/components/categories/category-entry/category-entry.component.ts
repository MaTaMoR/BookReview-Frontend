import {Component, Input} from '@angular/core';
import {BookRequest, Category} from "../../../../shared/data/interfaces/interfaces";
import {Router} from "@angular/router";
import {CategoryService} from "../../../../shared/data/services/category.service";

@Component({
  selector: 'app-category-entry',
  templateUrl: './category-entry.component.html',
  styleUrls: ['./category-entry.component.css']
})
export class CategoryEntryComponent {

  @Input('category') category!: Category;

  constructor(private router: Router, private categoryService: CategoryService) {
  }

  onClick(): void {
    const request: BookRequest = {
      categories: [this.categoryService.idRequest(this.category.id)]
    }

    this.router.navigate(['/books'], {queryParams: {request: btoa(JSON.stringify(request))}});
  }
}
