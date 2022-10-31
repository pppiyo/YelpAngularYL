import { Injectable } from '@angular/core';
import { Keywords } from '../shared/models/Keywords';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class KeywordsService {
  // public keywords = [];

  constructor(private http: HttpClient) { }

  getKeywords() {
    return this.http.get('http://127.0.0.1/autoComplete?')
      .pipe(
        // map((response: []) => response.map(item => item['name']))
        map((response: any) => response.map((item: { [x: string]: any; }) => item['text']))
      )

  }

}

