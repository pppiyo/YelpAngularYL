import { Component, OnInit, Input } from '@angular/core';
import { GlobalConstants } from 'src/app/global/global-constants';
import { DetailsService } from 'src/app/services/details.service';
import { BizDetails } from 'src/app/shared/models/BizDetails';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  public bizDetails: BizDetails;

  @Input() bizID = '';

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getBizDetails(this.bizID);
  }

  getBizDetails(id: string) {
    let urlCall = `${GlobalConstants.API_URL}/details?id=${id}`;
    this.httpClient.get<any>(urlCall)
      .subscribe((data: any) => {

        let addr = '';
        for (let i = 0; i < data.location.display_address.length; i++) {
          addr = addr + data.location.display_address[i] + " ";
        }

        let cate = '';
        for (let i = 0; i < data.categories.length; i++) {
          if (i == data.categories.length - 1) {
            cate = cate + data.categories[i]['title'];
          } else {
            cate = cate + data.categories[i]['title'] + ' | ';
          }
        }

        let stat = 'Closed';
        if (data.hours[0].is_open_now) {
          stat = 'Open';
        }

        let bizDetails = {
          'id': data.id,
          'name': data.name,
          'status': stat,
          'address': addr,
          'category': cate,
          'phone': data.display_phone,
          'price': data.price,
          'yelpLink': data.url,
          'photosURL': data.photos,
        }

        this.bizDetails = bizDetails;

      });
  }

}

        // console.log(this.bizDetails);
        // this.bizDetails.photosURL = data.photos;
        // console.log(data.id);
        // console.log(data.name);
        // console.log(data.hours[0].is_open_now);
        // console.log(data.display_phone);
        // console.log(data.url);
        // console.log(data.price);
        // console.log(data.photos);
        // console.log(data.location.display_address);
        // console.log(data.categories);






