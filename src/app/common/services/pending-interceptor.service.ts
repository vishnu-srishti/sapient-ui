import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Observable, ReplaySubject, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class PendingInterceptorService implements HttpInterceptor {

  private pendingRequests = 0;
  private filteredUrlPatters: RegExp[] = [];
  requestUrl: string | undefined;

  constructor(
    private router: Router,
    private commonService: CommonService,
  ) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.commonService.pendingStatus(true);
      }
      if (event instanceof NavigationError || event instanceof NavigationEnd || event instanceof NavigationCancel) {
        this.commonService.pendingStatus(false);
      }
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const urlByPass = this.bypassUrl(req.url);
    if (!urlByPass) {
      this.pendingRequests++;
      this.commonService.pendingStatus(true);
    }
    this.requestUrl = req.url;

    return next.handle(req)
      .pipe(
        map((event) => event ),
        catchError((error) => throwError(new Error(error.status)) ),
        finalize(() => {
          if (urlByPass === false) {
            this.pendingRequests--;
            if (this.pendingRequests === 0) {
              this.commonService.pendingStatus(false);
            }
          }
        })
      );
  }

  bypassUrl = (url: string): boolean => {
    return this.filteredUrlPatters.some(event => {
      return event.test(url);
    });
  }

}
