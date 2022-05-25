import {Component, OnInit, ViewChild} from '@angular/core';
import {SingleAutoCompleter} from "../../../utils/utils";
import {AutorResponse, BookRequest, BookResponse} from "../../../../books/interfaces/interfaces";
import {SingleAutoCompleterComponent} from "../../../components/single-auto-completer/single-auto-completer.component";
import {Router} from "@angular/router";
import {map} from "rxjs";
import {AutorService} from "../../../../books/services/autor.service";

@Component({
  selector: 'app-autor-tab',
  templateUrl: './autor-tab.component.html',
  styleUrls: ['./autor-tab.component.css']
})
export class AutorTabComponent {

    autorCompleter: SingleAutoCompleter<AutorResponse>;
    @ViewChild('input') singleCompleter!: SingleAutoCompleterComponent<AutorResponse>;

    constructor(private autorService: AutorService, private router: Router) {
        this.autorCompleter = new SingleAutoCompleter<AutorResponse>((key) => {
            return this.autorService.byFullName(key).pipe(
                map(resp => {
                    return resp.content;
                })
            )
        }, (key) => {
            return key.name + ' ' + key.surnames;
        });

        this.autorCompleter.listenChanges((result => {
            router.navigate(['/autor', result.id]);
        }));
    }

    buscar(): void {
        const input = this.singleCompleter.input
        const request: BookRequest = {
            autor: this.autorService.fullNameRequest(input)
        }

        this.router.navigate(['/autors'], { queryParams: { request: btoa(JSON.stringify(request)) } });
    }
}
