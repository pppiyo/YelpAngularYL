import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-results',
  template: `
    <p>
      No results available
    </p>
  `,
  styles: [
    'p { color:red; font-size: 22px; text-align: center; border: 1px solid white; border-radius: 11px; padding: 0% 5% 0% 5%; background-color: white; max-width: 450px; margin:0 auto;}'
  ]
})
export class NoResultsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
