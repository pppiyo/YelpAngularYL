import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-results',
  template: `
    <p>
      No results available
    </p>
  `,
  styles: [
    'p { color:red; font-weight: bold; text-align: center; border: 1px solid white; border-radius: 10px; padding: 0% 10% 0% 10%; background-color: white; max-width: 350px; margin:0 auto;}'
  ]
})
export class NoResultsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
