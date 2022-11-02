import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-results',
  template: `
    <p>
      No results available
    </p>
  `,
  styles: [
    'p { color:red; font-weight: bold; text-align: center; }'
  ]
})
export class NoResultsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
