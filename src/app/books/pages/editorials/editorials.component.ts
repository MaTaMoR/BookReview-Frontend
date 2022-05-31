import {Component} from '@angular/core';
import {
  BookRequest,
  Editorial,
  EditorialRequest,
  FilterRequest,
  Page
} from "../../../shared/data/interfaces/interfaces";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";
import {EditorialService} from "../../../shared/data/services/editorial.service";

@Component({
  selector: 'app-editorials',
  templateUrl: './editorials.component.html',
  styleUrls: ['./editorials.component.css']
})
export class EditorialsComponent {

  filter!: FilterRequest<EditorialRequest>;
  pageSizeOptions: number[] = [5, 10, 20];
  pageResponse!: Page<Editorial>;

  constructor(private editorialService: EditorialService, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params: Params) => {
      const request = params['request'];
      if (request) {
        this.filter = editorialService.defaultFilter(JSON.parse(atob(request)));
      } else {
        this.filter = editorialService.defaultFilter();
      }

      editorialService.filter(this.filter).subscribe((resp) => {
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

    this.editorialService.filter(this.filter).subscribe((resp) => {
      this.pageResponse = resp;
    })
  }

  onClick(editorial: Editorial): void {
    const request: BookRequest = {
      editorial: this.editorialService.idRequest(editorial.id)
    }

    this.router.navigate(['/books'], {queryParams: {request: btoa(JSON.stringify(request))}});
  }
}
