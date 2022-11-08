import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GlobalConstants } from '../global/global-constants';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private currBooking = new BehaviorSubject(localStorage);
  booking = this.currBooking.asObservable();

  constructor() { }

  nextBooking(bk: any) {
    this.currBooking.next(bk);
  }

  getBookings() {
    let ls = this.allStorage();
    console.log(ls);
    return ls;
    // return localStorage.getItem("1");
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
