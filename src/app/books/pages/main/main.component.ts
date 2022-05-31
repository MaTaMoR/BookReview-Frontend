import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ReviewsService} from "../../../shared/data/services/reviews.service";
import {Review} from "../../../shared/data/interfaces/interfaces";
import {delay} from "rxjs";
import {MatSidenav} from "@angular/material/sidenav";
import {SidenavService} from "../../../shared/services/sidenav.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements AfterViewInit {

  @ViewChild('drawer') private sidenav!: MatSidenav;

  constructor(private reviewsService: ReviewsService, private sidenavService: SidenavService, ) { }

  private _reviews!: Review[];

  get reviews(): Review[] {
    return this._reviews;
  }

  ngOnInit(): void {
    this.reviewsService.mainPage().pipe(
      delay(100000)
    ).subscribe(resp => {
      this._reviews = resp.content;
    })
  }

  isLoading(): boolean {
    return !this._reviews;
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }
}
