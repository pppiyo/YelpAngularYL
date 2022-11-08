import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalConstants } from 'src/app/global/global-constants';
import { BizDetails } from 'src/app/shared/models/BizDetails';
import { Output, EventEmitter } from '@angular/core';
import { Booking } from 'src/app/shared/models/Booking';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  booked: any[] = [];

  @Input() bizDetails: BizDetails;
  @Output() isReserved = new EventEmitter<boolean>();

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        date: ['', Validators.required],
        hour: ['', Validators.required],
        minute: ['', Validators.required],
      },
    );
  }

  onSubmittedChange() {
    this.isReserved.emit(this.submitted);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  cancelBooking() {
    this.form.reset();
    alert("Reservation cancelled!");
    this.submitted = false;
    this.onSubmittedChange();
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.onSubmittedChange();

    if (typeof (Storage) !== "undefined") {

      let id = this.bizDetails.id;
      let name = this.bizDetails.name;
      let date = this.form.value.date;
      let time = this.form.value.hour + ":" + this.form.value.minute;
      let email = this.form.value.email;

      let booking: Booking = {
        'id': id,
        'name': name,
        'date': date,
        'time': time,
        'email': email,
      }

      localStorage.setItem(id, JSON.stringify(booking));

      alert("Reservation created!");

    } else {
      alert("Sorry! No Web Storage support..");
    }

  }

}

// GlobalConstants.BOOKINGS.push(localStorage);

      // localStorage.setItem('id', this.bizDetails.id);
      // localStorage.setItem('name', this.bizDetails.name);
      // localStorage.setItem('date', this.form.value.date);
      // localStorage.setItem('time', this.form.value.hour + this.form.value.minute);
      // localStorage.setItem('email', this.form.value.email);
      // console.log(localStorage);
