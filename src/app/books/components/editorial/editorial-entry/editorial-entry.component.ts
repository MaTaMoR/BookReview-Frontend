import {Component, Input} from '@angular/core';
import {BookRequest, Editorial} from "../../../../shared/data/interfaces/interfaces";
import {Router} from "@angular/router";
import {EditorialService} from "../../../../shared/data/services/editorial.service";

@Component({
  selector: 'app-editorial-entry',
  templateUrl: './editorial-entry.component.html',
  styleUrls: ['./editorial-entry.component.css']
})
export class EditorialEntryComponent {

  @Input('editorial') editorial!: Editorial;

  constructor(private router: Router, private editorialService: EditorialService) {
  }

  onClick(): void {
    const request: BookRequest = {
      editorial: this.editorialService.idRequest(this.editorial.id)
    }

    this.router.navigate(['/books'], {queryParams: {request: btoa(JSON.stringify(request))}});
  }
}
