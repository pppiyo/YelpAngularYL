import { Injectable } from '@angular/core';
import { SearchResult } from '../shared/models/SearchResult'

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public results: SearchResult[];

  constructor() { this.results = []; }

  getSearchResult() {
    return this.results;
  }
}
