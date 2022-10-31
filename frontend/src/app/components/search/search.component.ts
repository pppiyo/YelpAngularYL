import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, CheckboxControlValueAccessor }
  from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';//
import { SearchService } from 'src/app/services/search.service';
import { max } from 'rxjs';

const BIZ_ITEM_NUM = 10;
const MILES_TO_METERS = 1609.344;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  userInput: FormGroup;
  private httpClient: HttpClient;
  resultTableVisible: boolean = false;
  detailsVisible: boolean = false;
  showDetailsData: string;

  constructor(private fb: FormBuilder, private searchServ: SearchService) { }

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
