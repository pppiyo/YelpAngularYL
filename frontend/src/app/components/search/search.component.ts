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
import { Input } from '@angular/core';
import { GlobalConstants } from 'src/app/global/global-constants';
GlobalConstants


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  // useAutoDetect: boolean = false;

  userInput: FormGroup;
  noResultsVisible: boolean = false;
  resultTableVisible: boolean = false;
  detailsVisible: boolean = false;
  bizID: string;

  filteredKeywords: string[];
  isLoading = false;
  errorMsg!: string;

  selectedKeyword: any = "";
  searchKeywordsCtrl = new FormControl();
  locationCtrl = new FormControl();
  filteredKeyword: any;

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

    this.searchKeywordsCtrl.valueChanges
      .pipe(
        filter(res => {
          return res !== null && res.length >= GlobalConstants.MIN_LENGTH_TERM
        }),
        distinctUntilChanged(),
        debounceTime(1000),
        tap(() => {
          this.errorMsg = "";
          this.filteredKeywords = [];
          this.isLoading = true;
        }),
        switchMap(value => this.http.get(GlobalConstants.API_URL + '/autoComplete?text=' + value)
          .pipe(
            finalize(() => {
              this.isLoading = false;
            }),
          )
        )
      )
      .subscribe((data: any) => {
        if (data['terms'] == undefined || data['categories'] == undefined) {
          this.errorMsg = "Something went wrong"; // DEBUG
        } else {
          this.errorMsg = "";
          let fk: any[] = [];
          data['terms'].forEach(function (value: any) {
            fk.push(value['text']);
          });
          data['categories'].forEach(function (value: any) {
            fk.push(value['title']);
          });
          this.filteredKeywords = fk;
        }
      });

    // this.autoDetectCtrl.valueChanges
    //   .subscribe(value => {
    //     // this.useAutoDetect = value;
    //     if (value) {
    //       this.autoDetectCtrl.clearValidators();
    //       this.autoDetectCtrl.updateValueAndValidity();
    //     }
    //   });
  }

  onCheckboxChange(e: any) {
    // const checkArray: FormArray = this.form.get('checkArray') as FormArray;
    // if (e.target.checked) {

    // }
  }

  onSubmit(form: FormGroup) {
    this.detailsVisible = false;
    this.noResultsVisible = false;
    this.resultTableVisible = false;

    form.value.keyword = this.searchKeywordsCtrl.getRawValue().trim();

    if (form.controls['auto-detect'].value) { // if checkbox checked
      alert('using ipinfo');
      this.useIpinfo(form);
    }
    else {
      let params: URLSearchParams = new URLSearchParams();
      params.set('term', form.value.keyword);
      params.set('distance', form.value.distance);
      params.set('categories', form.value.category);
      params.set('location', form.value.location);

      let query: string = params.toString();
      this.sendForm(query);
    }

  }

  onSelect(event: any) {
    this.selectedKeyword = event.target.textContent.trim();
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

        let query: string = params.toString();
        this.sendForm(query);
      })
  }

  sendForm(query: any) {
    fetch(GlobalConstants.API_URL + '/cook?' + query).then(
      (response) => response.json()
    ).then(
      (jsonResponse) => {
        if (!jsonResponse['businesses'] || jsonResponse['businesses'].length == 0) {
          this.noResultsVisible = true;
        }
        else {
          // update result table from here.
          for (let i = 0; i < Math.min(GlobalConstants.BIZ_ITEM_NUM, jsonResponse['businesses'].length); i++) {
            if (jsonResponse['businesses'][i]['image_url'] == '') {
              jsonResponse['businesses'][i]['image_url'] = GlobalConstants.YELP_ICON_URL;
            }
            this.searchServ.results[i] = {
              'order': i + 1,
              'id': jsonResponse['businesses'][i]['id'],
              'imgURL': jsonResponse['businesses'][i]['image_url'],
              'name': jsonResponse['businesses'][i]['name'],
              'rating': jsonResponse['businesses'][i]['rating'],
              'distance': Math.round(jsonResponse['businesses'][i]['distance'] / GlobalConstants.MILES_TO_METERS),
            };
          }
          this.resultTableVisible = true;
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
    this.noResultsVisible = false;
  }

  showDetailsPMethod(data: any) {
    this.noResultsVisible = false;
    this.resultTableVisible = false;
    this.detailsVisible = true;
    this.bizID = data;
  }



  removeHash() {
    history.replaceState('', document.title, window.location.origin + window.location.pathname + window.location.search);
  }
}
