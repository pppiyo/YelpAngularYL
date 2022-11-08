import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalConstants } from 'src/app/global/global-constants';
import { BizDetails } from 'src/app/shared/models/BizDetails';

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

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  cancelBooking() {
    this.form.reset();
    this.submitted = false;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    // console.log(JSON.stringify(this.form.value, null, 2));

    if (typeof (Storage) !== "undefined") {

      let id = this.bizDetails.id;
      let name = this.bizDetails.name;
      let date = this.form.value.date;
      let time = this.form.value.hour + this.form.value.minute;
      let email = this.form.value.email;

      let booking: any = {
        'id': id,
        'name': name,
        'date': date,
        'time': time,
        'email': email,
      }

      localStorage.setItem('1', JSON.stringify(booking));
      // localStorage.setItem(id, JSON.stringify(booking));
      let test = JSON.parse(localStorage.getItem('1') || "[]");
      console.log(test);

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
