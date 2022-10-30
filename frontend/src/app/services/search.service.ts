import { Injectable } from '@angular/core';
import { SearchResult } from '../shared/models/SearchResult'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private _url: string = "";

  constructor(private http: HttpClient) { }

  getSearchResult(): Observable<SearchResult[]> {
    return this.http.get<SearchResult[]>(this._url)
      .pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server Error');
  }
}
