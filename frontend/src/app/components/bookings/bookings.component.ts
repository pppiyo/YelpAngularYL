import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/global/global-constants';
import { BookingService } from 'src/app/services/booking.service';
GlobalConstants


@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  noReserve: boolean = true;
  bookings: any;

  constructor(private bookingServ: BookingService) { }

  ngOnInit(): void {
    localStorage.clear();

    this.bookingServ.booking.subscribe(bookings => this.bookings = bookings
    );
    // = localStorage.getItem('1');
    // console.log(this.bookings.email);


  }


  // allStorage() {

  //   var values = [],
  //     keys = Object.keys(localStorage),
  //     i = keys.length;

  //   while (i--) {
  //     values.push(localStorage.getItem(keys[i]));
  //   }

  //   return values;
  // }
  // nextBooking() {
  //   this.bookingServ.nextBooking(this.bookings);
  // }

  // getBookings() {
  //   // this.bookings = this.bookingServ.getBookings();
  // }



}
