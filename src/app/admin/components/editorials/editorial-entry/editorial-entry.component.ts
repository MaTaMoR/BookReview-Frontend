import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Autor, Editorial} from "../../../../shared/data/interfaces/interfaces";
import {MatDialog} from "@angular/material/dialog";
import {EditorialEditComponent} from "../editorial-edit/editorial-edit.component";

@Component({
  selector: 'app-editorial-entry',
  templateUrl: './editorial-entry.component.html',
  styleUrls: ['./editorial-entry.component.css']
})
export class EditorialEntryComponent {

  @Input('editorial') editorial!: Editorial;
  @Output('deleted') delete: EventEmitter<Editorial> = new EventEmitter<Editorial>();

  constructor(private dialog: MatDialog) {}

  onClick(): void {
    this.dialog.closeAll();
    this.dialog.open(EditorialEditComponent, {
      autoFocus: false,
      width: 'auto',
      height: 'auto',
      panelClass: 'trend-dialog',
      data: {content: this.editorial}
    }).afterClosed().subscribe((resp) => {
      if (resp) {
        //Si es 'true' significa que se ha borrado el Editorial
        if (resp == true) {
          this.delete.next(this.editorial);
        } else {
          this.editorial = resp;
        }
      }
    })
  }
}
