import {Component, ViewChild} from '@angular/core';
import {SingleAutoCompleter} from "../../../../shared/utils/utils";
import {BookRequest, Editorial, EditorialRequest} from "../../../../shared/data/interfaces/interfaces";
import {
  SingleAutoCompleterComponent
} from "../../../../shared/components/single-auto-completer/single-auto-completer.component";
import {Router} from "@angular/router";
import {map} from "rxjs";
import {EditorialService} from "../../../../shared/data/services/editorial.service";

@Component({
  selector: 'app-editorial-tab',
  templateUrl: './editorial-tab.component.html',
  styleUrls: ['./editorial-tab.component.css']
})
export class EditorialTabComponent {

  editorialController: SingleAutoCompleter<Editorial>;
  @ViewChild('input') singleCompleter!: SingleAutoCompleterComponent<Editorial>;

  constructor(private editorialService: EditorialService, private router: Router) {
    this.editorialController = new SingleAutoCompleter<Editorial>((key) => {
      return this.editorialService.byName(key).pipe(
        map(resp => {
          return resp.content;
        })
      )
    }, (key) => {
      return key.name;
    }, false);

    this.editorialController.listenChanges((result => {
      const request: BookRequest = {
        editorial: this.editorialService.idRequest(result.id)
      }

      this.router.navigate(['/books'], {queryParams: {request: btoa(JSON.stringify(request))}});
    }));
  }

  buscar(): void {
    const input = this.singleCompleter.input;
    const request: EditorialRequest = this.editorialService.nameRequest(input);

    this.router.navigate(['/editorials'], {queryParams: {request: btoa(JSON.stringify(request))}});
  }
}
