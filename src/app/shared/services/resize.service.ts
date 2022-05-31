import {Injectable, OnDestroy, OnInit} from "@angular/core";
import {MediaChange, MediaObserver} from "@angular/flex-layout";
import {distinctUntilChanged, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResizeService implements OnInit, OnDestroy {

  private mediaSubscription!: Subscription;

  constructor(private mediaObserver: MediaObserver) {
  }

  ngOnInit(): void {
    const getAlias = (MediaChange: MediaChange[]) => {
      return MediaChange[0].mqAlias;
    }

    this.mediaObserver.isActive('')
    this.mediaSubscription = this.mediaObserver
      .asObservable()
      .pipe(
        distinctUntilChanged(
          (x: MediaChange[], y: MediaChange[]) => getAlias(x) === getAlias(y)
        )
      )
      .subscribe((change) => {
        change.forEach((item) => {
          console.log(item);
        })

        console.log(change);
      })
  }

  ngOnDestroy(): void {
    this.mediaSubscription.unsubscribe();
  }
}
