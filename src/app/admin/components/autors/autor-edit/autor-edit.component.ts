import {Component, Inject, Input, NgZone} from '@angular/core';
import {Autor} from "../../../../shared/data/interfaces/interfaces";
import {FormGroupHandler} from "../../../../shared/utils/utils";
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EditData} from "../../../interfaces/interfaces";
import {AdminService} from "../../../services/admin.service";
import {AuthService} from "../../../../shared/services/auth.service";
import Swal from "sweetalert2";
import {AutorService} from "../../../../shared/data/services/autor.service";

@Component({
  selector: 'app-autor-edit',
  templateUrl: './autor-edit.component.html',
  styleUrls: ['./autor-edit.component.css']
})
export class AutorEditComponent {

  @Input('autor') autor!: Autor;

  formHandler: FormGroupHandler;

  loading: boolean = false;

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private dialogRef: MatDialogRef<AutorEditComponent>, private ngZone: NgZone, @Inject(MAT_DIALOG_DATA) public data: EditData<Autor>,
              private autorService: AutorService, private authService: AuthService, private adminService: AdminService) {

    this.autor = data?.content || { };

    this.formHandler = new FormGroupHandler(formBuilder.group({
      name: [this.autor.name, [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      surnames: [this.autor.surnames, [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
    }));
  }

  isValid() {
    return this.formHandler.formGroup.valid;
  }

  isNew() {
    return !this.autor.id;
  }

  delete(): void {
    if (this.autor.id) {
      this.adminService.deleteAutor(this.autor.id).subscribe((response) => {
        if (response) {
          this.dialogRef.close(true);
        } else {
          Swal.fire('Error', '¡No puedes borrar un autor con un libro asociado!', 'error');
        }
      })
    }
  }

  send(): void {
    if (this.isValid() && !this.loading) {
      this.loading = true;

      const name: string = this.formHandler.getValue('name');
      const surnames: string = this.formHandler.getValue('surnames');

      const newAutor: Autor = {
        id: this.autor?.id,
        name,
        surnames
      };

      this.adminService.updateOrCreateAutor(newAutor).subscribe((resp) => {
        this.loading = false;
        this.dialogRef.close(resp);
      });
    }
  }
}
