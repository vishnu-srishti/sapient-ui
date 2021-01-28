import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, throwError, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {

  @Input() bounceDelay = 100;
  @Input() filteredUrlPatterns: string[] = [];

  loaderVisible: boolean | undefined;

  constructor(
    private commonService: CommonService,
  ) {
    this.commonService.pendingStatusObservable$.pipe(
      debounce(this.deBounceHandler.bind(this))).subscribe((requests) => this.loaderVisible = requests);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  deBounceHandler = (pendingRequests: boolean): Observable<number> => {
    if (pendingRequests) {
      return timer(this.bounceDelay);
    }
    return timer(0);
  }

}
