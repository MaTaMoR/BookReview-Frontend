import {Component, Inject, Input, NgZone, OnInit} from '@angular/core';
import {Category} from "../../../../shared/data/interfaces/interfaces";
import {FormGroupHandler} from "../../../../shared/utils/utils";
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EditData} from "../../../interfaces/interfaces";
import {CategoryService} from "../../../../shared/data/services/category.service";
import {AuthService} from "../../../../shared/services/auth.service";
import {AdminService} from "../../../services/admin.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent {

  @Input('category') category!: Category;

  formHandler: FormGroupHandler;

  loading: boolean = false;

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private dialogRef: MatDialogRef<CategoryEditComponent>, private ngZone: NgZone, @Inject(MAT_DIALOG_DATA) public data: EditData<Category>,
              private categoryService: CategoryService, private authService: AuthService, private adminService: AdminService) {

    this.category = data?.content || { };

    this.formHandler = new FormGroupHandler(formBuilder.group({
      name: [this.category.name, [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
    }));
  }

  isValid() {
    return this.formHandler.formGroup.valid;
  }

  isNew() {
    return !this.category.id;
  }

  delete(): void {
    if (this.category.id) {
      this.adminService.deleteCategory(this.category.id).subscribe((response) => {
        if (response) {
          this.dialogRef.close(true);
        } else {
          Swal.fire('Error', '¡No puedes borrar una categoría con un libro asociado!', 'error');
        }
      })
    }
  }

  send(): void {
    if (this.isValid() && !this.loading) {
      this.loading = true;

      const name: string = this.formHandler.getValue('name');

      const newCategory: Category = {
        id: this.category?.id,
        name
      };

      this.adminService.updateOrCreateCategory(newCategory).subscribe((resp) => {
        this.loading = false;
        this.dialogRef.close(resp);
      });
    }
  }
}
