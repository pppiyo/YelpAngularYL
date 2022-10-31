import { Injectable } from '@angular/core';
import { SearchResult } from '../shared/models/SearchResult'
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public result: SearchResult;

  constructor() { }

  getSearchResult() {
    return
  }
}
