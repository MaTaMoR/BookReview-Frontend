import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Autor, AutorRequest, FilterRequest} from "../../../shared/data/interfaces/interfaces";
import {AutorService} from "../../../shared/data/services/autor.service";
import {Paginator} from "../../utils/utils";
import {AutorEditComponent} from "../../components/autors/autor-edit/autor-edit.component";

@Component({
  selector: 'app-autors',
  templateUrl: './autors.component.html',
  styleUrls: ['./autors.component.css']
})
export class AutorsComponent extends Paginator<AutorRequest, Autor>  {

  constructor(private autorService: AutorService, private dialog: MatDialog) {
    super(
      autorService.defaultFilter(),
      (request: FilterRequest<AutorRequest>) => {
        return autorService.filter(request);
      });
  }

  openCreate(): void {
    this.dialog.closeAll();
    this.dialog.open(AutorEditComponent, {
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
