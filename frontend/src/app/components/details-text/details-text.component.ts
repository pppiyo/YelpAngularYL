import { Component, OnInit, Input } from '@angular/core';
import { BizDetails } from 'src/app/shared/models/BizDetails';

@Component({
  selector: 'app-details-text',
  templateUrl: './details-text.component.html',
  styleUrls: ['./details-text.component.css']
})
export class DetailsTextComponent implements OnInit {
  @Input() bizDetails: BizDetails;
  constructor() { }

  ngOnInit(): void {
  }

}
