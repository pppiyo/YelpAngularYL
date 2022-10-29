import { Injectable } from '@angular/core';
import { Search } from '../shared/models/Search'

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  getSearch():Search[] {
    return sample_search;
  }
}
