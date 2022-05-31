import {FilterRequest, Page} from "../../shared/data/interfaces/interfaces";
import {PageEvent} from "@angular/material/paginator";
import {Observable} from "rxjs";

export class Paginator<K, V> {

  provider: (value: FilterRequest<K>) => Observable<Page<V>>
  filter!: FilterRequest<K>;
  pageSizeOptions: number[] = [5, 10, 20];
  pageResponse!: Page<V>;

  constructor(filter: FilterRequest<K>, provider: (value: FilterRequest<K>) => Observable<Page<V>>) {
    this.filter = filter;
    this.provider = provider;
    this.provider(this.filter).subscribe((resp) => {
      this.pageResponse = resp;
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

  update(): void {
    this.provider(this.filter).subscribe((resp) => {
      this.pageResponse = resp;
    })
  }

  resize(event: PageEvent): void {
    this.filter.page.size = event.pageSize;
    this.filter.page.page = event.pageIndex;

    this.update();
  }
}
