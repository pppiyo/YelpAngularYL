import { Component, OnInit, Input } from '@angular/core';
import { GlobalConstants } from 'src/app/global/global-constants';
import { DetailsService } from 'src/app/services/details.service';
import { BizDetails } from 'src/app/shared/models/BizDetails';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  public bizDetails: BizDetails;
  @Input() bizID = '';

  constructor(private detailsService: DetailsService) { }

  ngOnInit(): void {
    this.detailsService.getBizDetails(this.bizID)
      .subscribe((data: any) => this.bizDetails = data);
    // this.bizDetails = this.detailsService.getBizDetails(this.bizID);
    // console.log(this.bizDetails);

  }



}






