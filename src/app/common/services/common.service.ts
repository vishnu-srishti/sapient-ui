/** */

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SelectedFilters } from '../models/dataObject.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  pendingStatusObservable: Subject<boolean> = new Subject<boolean>();
  pendingStatusObservable$ = this.pendingStatusObservable.asObservable();

  filterObjectObservable: Subject<SelectedFilters> = new Subject<SelectedFilters>();
  filterObjectObservable$ = this.filterObjectObservable.asObservable();

  constructor(
    private http: HttpClient
  ) {
  }

  getApiResponse = (url: string, type: string): Observable<any> => {
    if (type === 'GET') {
      return this.httpResponseGet(url);
    } else {
      return null as any;
    }
  }

  httpResponseGet = (url: string): Observable<void | any[]> => {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(url, { headers, observe: 'response' })
      .pipe(
        map((response: any) => this.handleResponse(response)),
        catchError(this.handleError)
      );
  }

  handleResponse = (response: any) => {
    const resBody = response.body || null;
    return resBody;
  }

  handleError = (error: any) => {
    return throwError(new Error(error.message));
  }

  pendingStatus = (status: boolean | undefined) => {
    this.pendingStatusObservable.next(status);
  }

  applySelectedFilters = (filterObject: SelectedFilters) => {
    this.filterObjectObservable.next(filterObject);
  }

}
