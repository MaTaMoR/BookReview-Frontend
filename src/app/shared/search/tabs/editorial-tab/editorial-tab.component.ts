import {Component, OnInit, ViewChild} from '@angular/core';
import {SingleAutoCompleter} from "../../../utils/utils";
import {BookRequest, EditorialResponse, ReviewResponse} from "../../../../books/interfaces/interfaces";
import {SingleAutoCompleterComponent} from "../../../components/single-auto-completer/single-auto-completer.component";
import {ReviewsService} from "../../../../books/services/reviews.service";
import {Router} from "@angular/router";
import {map} from "rxjs";
import {EditorialService} from "../../../../books/services/editorial.service";

@Component({
  selector: 'app-editorial-tab',
  templateUrl: './editorial-tab.component.html',
  styleUrls: ['./editorial-tab.component.css']
})
export class EditorialTabComponent {

    editorialController: SingleAutoCompleter<EditorialResponse>;
    @ViewChild('input') singleCompleter!: SingleAutoCompleterComponent<EditorialResponse>;

    constructor(private editorialService: EditorialService, private router: Router) {
        this.editorialController = new SingleAutoCompleter<EditorialResponse>((key) => {
            return this.editorialService.byName(key).pipe(
                map(resp => {
                    return resp.content;
                })
            )
        }, (key) => {
            return key.name;
        });

        this.editorialController.listenChanges((result => {
            router.navigate(['/editorial', result.id]);
        }));
    }

    buscar(): void {
        const input = this.singleCompleter.input;
        const request: BookRequest = {
            editorial: this.editorialService.nameRequest(input)
        }

        this.router.navigate(['/editorials'], { queryParams: { request: btoa(JSON.stringify(request)) } });
    }
}
