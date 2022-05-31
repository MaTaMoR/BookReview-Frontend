import { Component, OnInit } from '@angular/core';
import {AutorService} from "../../../shared/data/services/autor.service";
import {MatDialog} from "@angular/material/dialog";
import {AutorRequest, Category, CategoryRequest, FilterRequest} from "../../../shared/data/interfaces/interfaces";
import {AutorEditComponent} from "../../components/autors/autor-edit/autor-edit.component";
import {Paginator} from "../../utils/utils";
import {CategoryService} from "../../../shared/data/services/category.service";
import {CategoryEditComponent} from "../../components/categories/category-edit/category-edit.component";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent extends Paginator<CategoryRequest, Category>{

  constructor(private categoryService: CategoryService, private dialog: MatDialog) {
    super(
      categoryService.defaultFilter(),
      (request: FilterRequest<AutorRequest>) => {
        return categoryService.filter(request);
      });
  }

  openCreate(): void {
    this.dialog.closeAll();
    this.dialog.open(CategoryEditComponent, {
      autoFocus: false,
      width: 'auto',
      height: 'auto',
      panelClass: 'trend-dialog',
      data: { }
    }).afterClosed().subscribe((resp) => {
      if (resp) {
        this.update();
      }
    })
  }
}
