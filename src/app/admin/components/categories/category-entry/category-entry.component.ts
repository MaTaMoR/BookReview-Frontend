import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Autor, Category} from "../../../../shared/data/interfaces/interfaces";
import {MatDialog} from "@angular/material/dialog";
import {AutorEditComponent} from "../../autors/autor-edit/autor-edit.component";
import {CategoryEditComponent} from "../category-edit/category-edit.component";

@Component({
  selector: 'app-category-entry',
  templateUrl: './category-entry.component.html',
  styleUrls: ['./category-entry.component.css']
})
export class CategoryEntryComponent {

  @Input('category') category!: Category;
  @Output('deleted') delete: EventEmitter<Category> = new EventEmitter<Category>();

  constructor(private dialog: MatDialog) {}

  onClick(): void {
    this.dialog.closeAll();
    this.dialog.open(CategoryEditComponent, {
      autoFocus: false,
      width: 'auto',
      height: 'auto',
      panelClass: 'trend-dialog',
      data: {content: this.category}
    }).afterClosed().subscribe((resp) => {
      if (resp) {
        //Si es 'true' significa que se ha borrado el Category
        if (resp == true) {
          this.delete.next(this.category);
        } else {
          this.category = resp;
        }
      }
    })
  }
}
