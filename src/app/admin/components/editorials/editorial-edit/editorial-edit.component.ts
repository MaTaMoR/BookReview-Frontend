import {Component, Inject, Input, NgZone, OnInit} from '@angular/core';
import {Category, Editorial} from "../../../../shared/data/interfaces/interfaces";
import {FormGroupHandler} from "../../../../shared/utils/utils";
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EditData} from "../../../interfaces/interfaces";
import {CategoryService} from "../../../../shared/data/services/category.service";
import {AuthService} from "../../../../shared/services/auth.service";
import {AdminService} from "../../../services/admin.service";
import Swal from "sweetalert2";
import {UploadComponent} from "../../upload/upload.component";

@Component({
  selector: 'app-editorial-edit',
  templateUrl: './editorial-edit.component.html',
  styleUrls: ['./editorial-edit.component.css']
})
export class EditorialEditComponent {

  @Input('editorial') editorial!: Editorial;

  formHandler: FormGroupHandler;

  loading: boolean = false;

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private dialogRef: MatDialogRef<EditorialEditComponent>, private ngZone: NgZone, @Inject(MAT_DIALOG_DATA) public data: EditData<Editorial>,
              private categoryService: CategoryService, private authService: AuthService, private adminService: AdminService) {

    this.editorial = data?.content || { };

    this.formHandler = new FormGroupHandler(formBuilder.group({
      name: [this.editorial.name, [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
    }));
  }

  openUpload(): void {
    this.dialog.open(UploadComponent, {
      autoFocus: true,
      panelClass: 'trend-dialog'
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.editorial.image = result;
      }
    });
  }

  isValid() {
    return this.formHandler.formGroup.valid;
  }

  isNew() {
    return !this.editorial.id;
  }

  delete(): void {
    if (this.editorial.id) {
      this.adminService.deleteEditorial(this.editorial.id).subscribe((response) => {
        if (response) {
          this.dialogRef.close(true);
        } else {
          Swal.fire('Error', '¡No puedes borrar una editorial con un libro asociado!', 'error');
        }
      })
    }
  }

  send(): void {
    if (this.isValid() && !this.loading) {
      this.loading = true;

      const name: string = this.formHandler.getValue('name');

      const newEditorial: Editorial = {
        id: this.editorial?.id,
        image: this.editorial?.image,
        name
      };

      this.adminService.updateOrCreateEditorial(newEditorial).subscribe((resp) => {
        this.loading = false;
        this.dialogRef.close(resp);
      });
    }
  }
}
