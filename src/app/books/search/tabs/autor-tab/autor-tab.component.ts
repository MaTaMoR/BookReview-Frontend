import {Component, ViewChild} from '@angular/core';
import {SingleAutoCompleter} from "../../../../shared/utils/utils";
import {Autor, BookRequest} from "../../../../shared/data/interfaces/interfaces";
import {
  SingleAutoCompleterComponent
} from "../../../../shared/components/single-auto-completer/single-auto-completer.component";
import {Router} from "@angular/router";
import {map} from "rxjs";
import {AutorService} from "../../../../shared/data/services/autor.service";

@Component({
  selector: 'app-autor-tab',
  templateUrl: './autor-tab.component.html',
  styleUrls: ['./autor-tab.component.css']
})
export class AutorTabComponent {

  autorCompleter: SingleAutoCompleter<Autor>;
  @ViewChild('input') singleCompleter!: SingleAutoCompleterComponent<Autor>;

  constructor(private autorService: AutorService, private router: Router) {
    this.autorCompleter = new SingleAutoCompleter<Autor>((key) => {
      return this.autorService.byFullName(key).pipe(
        map(resp => {
          return resp.content;
        })
      )
    }, (key) => {
      return key.name + ' ' + key.surnames;
    }, false);

    this.autorCompleter.listenChanges((result => {
      const request: BookRequest = {
        autor: this.autorService.idRequest(result.id)
      }

      this.router.navigate(['/books'], {queryParams: {request: btoa(JSON.stringify(request))}});
    }));
  }

  buscar(): void {
    const input = this.singleCompleter.input
    const request: BookRequest = {
      autor: this.autorService.fullNameRequest(input)
    }

    this.router.navigate(['/autors'], {queryParams: {request: btoa(JSON.stringify(request))}});
  }
}
