import { Injectable } from '@angular/core';
import { Search } from '../shared/models/Search'
import { sample_search } from "../../data";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  getSearch():Search[] {
    return sample_search;
  }
}
