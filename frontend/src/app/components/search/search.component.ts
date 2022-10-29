import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }
from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  userInput: FormGroup;

  constructor(private fb: FormBuilder) {}

  categories = ['Default', 'Arts & Entertainment',
            'Health & Medical', 'Hotels & Travel',
            'Food', 'Professional Services'];

  ngOnInit() {
    this.userInput = this.fb.group({
      keyword: ['', Validators.required],
      distance: ['10', Validators.required],
      category: [`${this.categories[0]}`, Validators.required],
      location: ['', Validators.required],
    });
  }

    onSubmit(form: FormGroup) {

      console.log('Valid?', form.valid); // true or false
      console.log('keyword', form.value.keyword);
      console.log('distance', form.value.distance);
      console.log('category', form.value.category);
      console.log(form.value);


   }

  clearAll() {
    // this.userInput.reset();
    //todo: more to come
   }

   get form() { return this.userInput.controls; }


}

