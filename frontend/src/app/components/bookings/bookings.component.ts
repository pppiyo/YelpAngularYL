import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/global/global-constants';
import { Booking } from 'src/app/shared/models/Booking';
GlobalConstants


@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  noReserve: boolean = false;
  bookings: Booking[];

  constructor() { }
  // localStorage.clear();

  ngOnInit(): void {
    console.log(localStorage);//

    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) !== null) { }

      }


      // let test = JSON.parse(localStorage.getItem(id) || "[]");


    } else {
      this.noReserve = true;
    }


  }





  allStorage() {

    var values = [],
      keys = Object.keys(localStorage),
      i = keys.length;

    while (i--) {
      values.push(localStorage.getItem(keys[i]));
    }

    return values;
  }


}
