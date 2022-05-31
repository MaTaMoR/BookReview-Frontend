import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Autor} from "../../../../shared/data/interfaces/interfaces";
import {MatDialog} from "@angular/material/dialog";
import {AutorEditComponent} from "../autor-edit/autor-edit.component";

@Component({
  selector: 'app-autor-entry',
  templateUrl: './autor-entry.component.html',
  styleUrls: ['./autor-entry.component.css']
})
export class AutorEntryComponent {

  @Input('autor') autor!: Autor;
  @Output('deleted') delete: EventEmitter<Autor> = new EventEmitter<Autor>();

  constructor(private dialog: MatDialog) {}

  onClick(): void {
    this.dialog.closeAll();
    this.dialog.open(AutorEditComponent, {
      autoFocus: false,
      width: 'auto',
      height: 'auto',
      panelClass: 'trend-dialog',
      data: {content: this.autor}
    }).afterClosed().subscribe((resp) => {
      if (resp) {
        //Si es 'true' significa que se ha borrado el Autor
        if (resp == true) {
          this.delete.next(this.autor);
        } else {
          this.autor = resp;
        }
      }
    })
  }
}
