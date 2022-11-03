import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BizDetails } from '../shared/models/BizDetails';
import { map } from 'rxjs/operators'
import { GlobalConstants } from '../global/global-constants';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  public bizDetails: any;
  data: any;

  constructor(private httpClient: HttpClient) { }

  getBizDetails(id: string) {
    let urlCall = `${GlobalConstants.API_URL}/details?id=${id}`;
    let yelpDetails = this.httpClient.get<any>(urlCall)
      .subscribe((data: BizDetails) => {
        this.bizDetails = data;
        console.log(this.bizDetails);
        return this.bizDetails;
      });
  }
}
    // let yelpDetails = this.httpClient.get<any>(urlCall)
    //   .subscribe((data: BizDetails) => {
    //     console.log(data);
    //     this.bizDetails = data;
    //     console.log(this.bizDetails);
    //     return this.bizDetails;
    //   });

  // getBizDetails(id: string) {
  // let urlCall = `${GlobalConstants.API_URL}/details?id=${id}`;

  // return this.httpClient.get<BizDetails>(urlCall);
  // .subscribe((data: BizDetails) => {
  //   console.log(data);
  //   this.bizDetails = data;
  //   console.log(this.bizDetails);
  //   return this.bizDetails;
  // });


  // this.httpClient.get<BizDetails>(urlCall)
  //   .subscribe((data: BizDetails) => {
  //     console.log(data);
  //     this.bizDetails = data;
  //     console.log(this.bizDetails);
  //   });
  // console.log(this.bizDetails);
  // return this.bizDetails;

  // console.log(this.httpClient.get<any>(urlCall));
  // return this.httpClient.get<any>(urlCall);

