import { Component, OnInit } from '@angular/core';
import {Paginator} from "../../utils/utils";
import {
  Autor,
  AutorRequest,
  Editorial,
  EditorialRequest,
  FilterRequest
} from "../../../shared/data/interfaces/interfaces";
import {MatDialog} from "@angular/material/dialog";
import {EditorialService} from "../../../shared/data/services/editorial.service";
import {EditorialEditComponent} from "../../components/editorials/editorial-edit/editorial-edit.component";

@Component({
  selector: 'app-editorials',
  templateUrl: './editorials.component.html',
  styleUrls: ['./editorials.component.css']
})
export class EditorialsComponent extends Paginator<EditorialRequest, Editorial>  {

  constructor(private editorialService: EditorialService, private dialog: MatDialog) {
    super(
      editorialService.defaultFilter(),
      (request: FilterRequest<EditorialRequest>) => {
        return editorialService.filter(request);
      });
  }

  openCreate(): void {
    this.dialog.closeAll();
    this.dialog.open(EditorialEditComponent, {
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
