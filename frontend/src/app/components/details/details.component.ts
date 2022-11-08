import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewEncapsulation } from '@angular/core';
import { GlobalConstants } from 'src/app/global/global-constants';
import { DetailsService } from 'src/app/services/details.service';
import { BizDetails } from 'src/app/shared/models/BizDetails';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Review } from 'src/app/shared/models/Review';
import { ReservationComponent } from '../reservation/reservation.component';

declare var $: any;
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailsComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;
  @ViewChild(ReservationComponent, { static: true }) child: ReservationComponent;
  @Input() bizID = '';
  @Output() showTable = new EventEmitter<boolean>();

  public isReserved = false;
  public bizDetails: BizDetails;
  public isTableVisible = false;
  public hideModal = false;

  mapOptions: google.maps.MapOptions;
  marker: any;

  cancelBooking() {
    this.child.cancelBooking();
  }

  updateColor(status: boolean): string {
    if (status) {
      return "red";
    } else {
      return "blue";
    }
  }

  changeReservStat(eventData: boolean) {
    this.isReserved = eventData;
    this.closebutton.nativeElement.click();
  }



  // mapOptions: google.maps.MapOptions = {
  //   center: { lat: 38.9987208, lng: -77.2538699 },
  //   zoom: 14
  // }
  // marker = {
  //   position: { lat: 38.9987208, lng: -77.2538699 },
  // }

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getBizDetails(this.bizID);
  }

  getBizDetails(id: string) {
    let urlCall = `${GlobalConstants.API_URL}/details?id=${id}`;
    this.httpClient.get<any>(urlCall)
      .subscribe((data: any) => {

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


        // map locatiions update:
        this.mapOptions = {
          'center': { 'lat': data.coordinates.latitude, 'lng': data.coordinates.longitude },
          'zoom': 14
        }
        this.marker = {
          position: { 'lat': data.coordinates.latitude, 'lng': data.coordinates.longitude },
        }
      });
  }

  backToTable() {
    this.isTableVisible = true;
    this.showTable.emit(this.isTableVisible);
  }

}


