import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/global/global-constants';
GlobalConstants


@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  noReserve: boolean = true;
  bookings: any;

  constructor() { }

  ngOnInit(): void {
    localStorage.clear();



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
