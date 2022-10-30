import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }
   from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';//

@Component({
   selector: 'app-search',
   templateUrl: './search.component.html',
   styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
   userInput: FormGroup;
  private httpClient: HttpClient;

   constructor(private fb: FormBuilder) { }

   categories = ['Default', 'Arts & Entertainment',
      'Health & Medical', 'Hotels & Travel',
      'Food', 'Professional Services'];

   ngOnInit() {
      this.userInput = this.fb.group({
         keyword: ['', Validators.required],
         distance: ['10', Validators.required],
         category: [`${this.categories[0]}`, Validators.required],
         location: ['', Validators.required],
      });
   }

   onSubmit(form: FormGroup) {

      console.log('Valid?', form.valid); // true or false
      console.log('keyword', form.value.keyword);
      console.log('distance', form.value.distance);
      console.log('category', form.value.category);
      console.log('location', form.value.location);
      console.log(form.value);

      let params: URLSearchParams = new URLSearchParams();
      params.set('keyword', form.value.keyword);
      params.set('distance', form.value.distance);
      params.set('category', form.value.category);
      params.set('location', form.value.location);

      // sent to backend.

      this.useIpinfo(this.httpClient);
   }

   get form() { return this.userInput.controls; }

  //  useIpinfo(form: FormGroup) {
  //     fetch("https://ipinfo.io/json?token=f6e03259a7a9e5").then(
  //        (response) => response.json()
  //     ).then(
  //        (jsonResponse) => {
  //           let coords = jsonResponse.loc;
  //           let a = coords.split(',');
  //           var lat = a[0];
  //           var lng = a[1];

  //           form.value.longitude = lng;
  //           form.value.latitude = lat;


  //           return this.http.get(StaticSettings.BASE_URL, {
  //              search: jsonFormData
  //           }).subscribe(
  //              (response) => this.onGetForecastResult(response.json()),
  //              (error) => this.onGetForecastError(error.json()),
  //              () => this.onGetForecastComplete()
  //           );
  //        }
  //     );
  //  }



   clearAll() {
      // this.userInput.reset();
      //todo: more to come
   }

  useIpinfo(httpClient: HttpClient) {


    this.httpClient.get('https://ipinfo.io/json?token=f6e03259a7a9e5').subscribe(
       (value: any) => {
         console.log(value);
        //  this.userIP = value.ip;
       },
       (error) => {
         console.log(error);
       }
     );
   }

}

