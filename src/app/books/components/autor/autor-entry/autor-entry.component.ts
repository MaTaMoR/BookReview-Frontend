import {Component, Input} from '@angular/core';
import {Autor} from "../../../../shared/data/interfaces/interfaces";

@Component({
  selector: 'app-autor-entry',
  templateUrl: './autor-entry.component.html',
  styleUrls: ['./autor-entry.component.css']
})
export class AutorEntryComponent {

  @Input('autor') autor!: Autor;

  onClick(): void {

  }
}
