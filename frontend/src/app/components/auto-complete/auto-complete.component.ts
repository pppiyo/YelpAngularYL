import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { debounceTime, tap, switchMap, finalize, distinctUntilChanged, filter } from 'rxjs/operators';

const API_KEY = "";

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent implements OnInit {
  searchKeywordctrl = new FormControl();
  filteredKeywords: any;
  isLoading = false;
  errorMsg!: string;
  minLengthTerm = 3;
  selectedKeyword: any = "";

  constructor(
    private http: HttpClient
  ) { }

  onSelected() {
    console.log(this.selectedKeyword);
    this.selectedKeyword = this.selectedKeyword;
  }

  displayWith(value: any) {
    return value?.Term;
  }

  clearSelection() {
    this.selectedKeyword = "";
    this.filteredKeywords = [];
  }

  ngOnInit() {
    this.searchKeywordctrl.valueChanges
      .pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTerm
        }),
        distinctUntilChanged(),
        debounceTime(1000),
        tap(() => {
          this.errorMsg = "";
          this.filteredKeywords = [];
          this.isLoading = true;
        }),
        switchMap(value => this.http.get('http://127.0.0.1/autoComplete?' + value)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe((data: any) => {
        if (data['terms'] == undefined) {
          this.errorMsg = data['Error'];
          this.filteredKeywords = [];
        } else {
          this.errorMsg = "";
          this.filteredKeywords = data['terms'];
        }
        console.log(this.filteredKeywords);
      });
  }
}
