import { Injectable } from '@angular/core';
import { Keywords } from '../shared/models/Keywords';

@Injectable({
  providedIn: 'root'
})
export class KeywordsService {
  public keywords: Keywords[];

  constructor() { this.keywords = []; }

  getKeywords() {
    return this.keywords;
  }
}




