import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, CheckboxControlValueAccessor }
  from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';//
import { SearchService } from 'src/app/services/search.service';
import { max } from 'rxjs';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { debounceTime, tap, switchMap, finalize, distinctUntilChanged, filter } from 'rxjs/operators';

const BIZ_ITEM_NUM = 10;
const MILES_TO_METERS = 1609.344;

export interface Term {
  term: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  userInput: FormGroup;
  resultTableVisible: boolean = false;
  detailsVisible: boolean = false;
  showDetailsData: string;

  filteredKeywords: Observable<any[]>;
  isLoading = false;
  errorMsg!: string;
  minLengthTerm = 3;

  myControl = new FormControl();
  // options: Term[] = [{ term: 'Mary' }, { term: 'Shelley' }, { term: 'Igor' }]; //
  // filteredOptions: Observable<string[]>; //

  constructor(private fb: FormBuilder, private searchServ: SearchService, private http: HttpClient) { }

  categories = ['Default', 'Arts & Entertainment',
    'Health & Medical', 'Hotels & Travel',
    'Food', 'Professional Services'];

  ngOnInit() {
    this.userInput = this.fb.group({
      keyword: ['', Validators.required],
      distance: ['10', Validators.required],
      category: [`${this.categories[0]}`, Validators.required],
      location: ['', Validators.required],
      'auto-detect': false
    });
    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => {
    //     const term = typeof value === 'string' ? value : value?.term;
    //     return term ? this._filter(term as string) : this.options.slice();
    //   }),
    // );

    this.myControl.valueChanges
      .pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTerm
        }),
        distinctUntilChanged(),
        debounceTime(1000),
        switchMap(value => this.http.get('http://127.0.0.1/autoComplete?' + value)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe((data: any) => {
        if (data['terms'] == undefined || data['categories'] == undefined) {
          this.errorMsg = data['Error'];
        } else {
          this.errorMsg = "";
          this.filteredKeywords = data['terms']['text'].concat(data['categories']['title']);
        }
        console.log(this.filteredKeywords);
      });
  }

  // private _filter(term: string): Term[] {
  //   const filterValue = term.toLowerCase();
  //   return this.options.filter(option => option.term.toLowerCase().includes(filterValue));
  // }

  displayFn(term: Term): string {
    return term && term.term ? term.term : '';
  }


  onSubmit(form: FormGroup) {
    // console.log(form.value); // DEBUG
    if (form.controls['auto-detect'].value) { // if checkbox checked
      this.useIpinfo(form);
    }
    else {
      let params: URLSearchParams = new URLSearchParams();
      params.set('term', form.value.keyword);
      params.set('distance', form.value.distance);
      params.set('categories', form.value.category);
      params.set('location', form.value.location);

      console.log(params.toString()); // DEBUG

      let query: string = params.toString();
      this.sendForm(query);
    }
  }

  get form() { return this.userInput.controls; }

  useIpinfo(form: FormGroup) {
    fetch("https://ipinfo.io/json?token=f6e03259a7a9e5").then(
      (response) => response.json()
    ).then(
      (jsonResponse) => {
        let coords = jsonResponse.loc;
        let trimmedCoords = coords.split(',');
        var lat = trimmedCoords[0];
        var lng = trimmedCoords[1];

        let params: URLSearchParams = new URLSearchParams();
        params.set('term', form.value.keyword);
        params.set('distance', form.value.distance);
        params.set('categories', form.value.category);
        params.set('latitude', lat);
        params.set('longitude', lng);

        console.log(params.toString()); // DEBUG

        let query: string = params.toString();
        this.sendForm(query);
      })
  }

  sendForm(query: any) {
    fetch("http://127.0.0.1:3000/cook?" + query).then(
      (response) => response.json()
    ).then(
      (jsonResponse) => {
        if (!jsonResponse['businesses'] || jsonResponse['businesses'].length == 0) {
          // 'No results available'
        }
        else {
          // update result table from here.
          for (let i = 0; i < Math.min(BIZ_ITEM_NUM, jsonResponse['businesses'].length); i++) {
            this.searchServ.results[i] = {
              'order': i + 1,
              'id': jsonResponse['businesses'][i]['id'],
              'imgURL': jsonResponse['businesses'][i]['image_url'],
              'name': jsonResponse['businesses'][i]['name'],
              'rating': jsonResponse['businesses'][i]['rating'],
              'distance': Math.round(jsonResponse['businesses'][i]['distance'] / MILES_TO_METERS),
            };
          }
          this.resultTableVisible = true;

          // console.log(this.searchServ.results); // DEBUG
        }
      }
    )
  }

  clearAll() {
    this.removeHash();
    this.userInput.reset();
    this.userInput.patchValue({
      distance: 10,
      category: 'Default',
    });
    this.resultTableVisible = false;
    this.detailsVisible = false;

  }

  showDetailsPMethod(data: any) {
    this.resultTableVisible = false;
    this.showDetailsData = data;
    this.detailsVisible = true;
  }

  removeHash() {
    history.replaceState('', document.title, window.location.origin + window.location.pathname + window.location.search);
  }
}
