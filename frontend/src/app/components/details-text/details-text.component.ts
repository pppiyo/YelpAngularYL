import { Component, OnInit, Input } from '@angular/core';
import { BizDetails } from 'src/app/shared/models/BizDetails';

@Component({
  selector: 'app-details-text',
  templateUrl: './details-text.component.html',
  styleUrls: ['./details-text.component.css']
})
export class DetailsTextComponent implements OnInit {
  public getColor(status: string): string {
    if (status == "Closed") {
      return "red";
    } else if (status == "Open now") {
      return "green";
    } else {
      return "black";
    }
  }

  @Input() bizDetails: BizDetails;
  constructor() { }

  ngOnInit(): void {
  }

}
