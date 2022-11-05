import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalConstants } from 'src/app/global/global-constants';
import { DetailsService } from 'src/app/services/details.service';
import { BizDetails } from 'src/app/shared/models/BizDetails';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Review } from 'src/app/shared/models/Review';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  @Input() bizID = '';

  public bizDetails: BizDetails;
  // public review: Review;

  mapOptions: google.maps.MapOptions = {
    center: { lat: 38.9987208, lng: -77.2538699 },
    zoom: 14
  }
  marker = {
    position: { lat: 38.9987208, lng: -77.2538699 },
  }

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    console.log(this.bizID);

    this.getBizDetails(this.bizID);

  }

  getBizDetails(id: string) {
    let urlCall = `${GlobalConstants.API_URL}/details?id=${id}`;
    this.httpClient.get<any>(urlCall)
      .subscribe((data: any) => {
        // console.log(data);

        // name
        let name = 'N/A';
        if (data.name) {
          name = data.name;
        }

        // status
        let stat = 'N/A';
        if (data.hours) {
          if (data.hours[0].is_open_now) {
            stat = 'Open now';
          } else {
            stat = 'Closed';
          }
        }

        // phone
        let phone = 'N/A';
        if (data.display_phone) {
          phone = data.display_phone;
        }

        // yelp url
        let yelpURL = 'N/A';
        if (data.url) {
          yelpURL = data.url;
        };

        // price
        let price = 'N/A';
        if (data.price) {
          price = data.price;
        };

        // photos
        let photos: string[];
        photos = [];
        if (data.photos) {
          photos = data.photos;
        };

        // address
        let addr = '';
        if (data.location.display_address) {
          for (let i = 0; i < data.location.display_address.length; i++) {
            addr = addr + data.location.display_address[i] + " ";
          }
        } else {
          addr = 'N/A';
        }

        // category
        let cate = '';
        if (data.categories) {
          for (let i = 0; i < data.categories.length; i++) {
            if (i == data.categories.length - 1) {
              cate = cate + data.categories[i]['title'];
            } else {
              cate = cate + data.categories[i]['title'] + ' | ';
            }
          }
        } else {
          cate = 'N/A';
        }

        let bizDetails = {
          'id': data.id,
          'name': name,
          'status': stat,
          'address': addr,
          'category': cate,
          'phone': phone,
          'price': price,
          'yelpLink': yelpURL,
          'photosURL': photos,
        }

        this.bizDetails = bizDetails;
      });
  }

  backToTable() {
    // resultTableVisible = true;
  }

  // @Output()
  // notify: EventEmitter<string> = new EventEmitter<string>();

  // showDetails(event: any, resultTableVisible: any) {
  //   this.notify.emit(resultTableVisible);
  // }

  // getReviews(id: string) {
  //   fetch(GlobalConstants.API_URL + "/reviews?id=" + id).then(
  //     (response) => response.json()
  //   ).then(
  //     (jsonResponse) => {
  //       // console.log(jsonResponse['reviews']);
  //       let result = jsonResponse['reviews'];
  //       if (!result || result.length == 0) {
  //       }
  //       else {
  //         // update result table from here.
  //         // this.reviews
  //         for (let i = 0; i < Math.min(GlobalConstants.REVIEW_ITEM_NUM, result.length); i++) {
  //           let element = {
  //             'id': result[i]['id'],
  //             'username': result[i]['user']['name'],
  //             'rating': result[i]['rating'] + '/5',
  //             'text': result[i]['text'],
  //             'date': result[i]['time_created'].substring(0, 10),
  //           };
  //           this.reviews.push(element);
  //           console.log(this.reviews[i]);
  //         }
  //       }
  //     }
  //   )
  // }

}


