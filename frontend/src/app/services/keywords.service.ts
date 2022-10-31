import { Injectable } from '@angular/core';
import { Keywords } from '../shared/models/Keywords';

@Injectable({
  providedIn: 'root'
})
export class KeywordsService {
  public keywords = [];

  constructor() { }

  getKeywords() {
    return this.keywords;
  }

}

