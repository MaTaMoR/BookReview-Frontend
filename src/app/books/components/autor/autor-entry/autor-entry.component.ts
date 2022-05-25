import {Component, Input, OnInit} from '@angular/core';
import {AutorResponse, BookResponse} from "../../../interfaces/interfaces";

@Component({
  selector: 'app-autor-entry',
  templateUrl: './autor-entry.component.html',
  styleUrls: ['./autor-entry.component.css']
})
export class AutorEntryComponent {

    @Input('autor') autor!: AutorResponse;

    onClick(): void {

    }
}
