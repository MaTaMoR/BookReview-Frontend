import {Component} from '@angular/core';
import {Autor, BookRequest, FilterRequest, Page} from "../../../shared/data/interfaces/interfaces";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";
import {AutorService} from "../../../shared/data/services/autor.service";

@Component({
  selector: 'app-autors',
  templateUrl: './autors.component.html',
  styleUrls: ['./autors.component.css']
})
export class AutorsComponent {

  filter!: FilterRequest<BookRequest>;
  pageSizeOptions: number[] = [5, 10, 20];
  pageResponse!: Page<Autor>;

  constructor(private autorService: AutorService, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params: Params) => {
      const request = params['request'];
      if (request) {
        this.filter = autorService.defaultFilter(JSON.parse(atob(request)));
      } else {
        this.filter = autorService.defaultFilter();
      }

      autorService.filter(this.filter).subscribe((resp) => {
        this.pageResponse = resp;
      })
    })
  }

  totalPages(): number {
    const totalElements = this.pageResponse.page.totalElements;
    const pageSize = this.pageResponse.page.size;

    return totalElements / pageSize;
  }

  totalElements(): number {
    return this.pageResponse.page.totalElements;
  }

  currentPage() {
    return this.pageResponse.page.page;
  }

  pageSize(): number {
    return this.pageResponse.page.size;
  }

  resize(event: PageEvent): void {
    this.filter.page.size = event.pageSize;
    this.filter.page.page = event.pageIndex;

    this.autorService.filter(this.filter).subscribe((resp) => {
      this.pageResponse = resp;
    })
  }

  onClick(autor: Autor): void {
    const request: BookRequest = {
      autor: this.autorService.idRequest(autor.id)
    }

    this.router.navigate(['/books'], {queryParams: {request: btoa(JSON.stringify(request))}});
  }
}
