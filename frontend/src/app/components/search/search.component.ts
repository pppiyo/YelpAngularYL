import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, CheckboxControlValueAccessor }
  from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';//
import { SearchService } from 'src/app/services/search.service';
import { KeywordsService } from 'src/app/services/keywords.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  userInput: FormGroup;
  private httpClient: HttpClient;

  constructor(private fb: FormBuilder, private searchServ: SearchService, private keyServ: KeywordsService) { }

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
        // console.log(jsonResponse['businesses'][0]); // DEBUG
        if (!jsonResponse['businesses'] || jsonResponse['businesses'].length == 0) {
          // 'No results available'
        }
        else {
          // console.log(jsonResponse['businesses'][0]); // DEBUG
          // update result table from here.
          this.searchServ.result = {
            'id': jsonResponse['businesses']['id'],
            'imgURL': jsonResponse['businesses']['image_url'],
            'name': jsonResponse['businesses']['name'],
            'rating': jsonResponse['businesses']['rating'],
            'distance': jsonResponse['businesses']['distance'],
          };

          alert("hi");
          console.log(this.searchServ.result);
          // this.searchServ.getSearchResult();
        }
      }
    )
  }


  clearAll() {
    // this.userInput.reset();
    //todo: more to come
  }
}
