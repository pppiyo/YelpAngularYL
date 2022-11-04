import { Component, OnInit, Input } from '@angular/core';
import { GlobalConstants } from 'src/app/global/global-constants';
// import { ReviewService } from 'src/app/services/review.service';
import { BizDetails } from 'src/app/shared/models/BizDetails';
import { Review } from 'src/app/shared/models/Review';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  @Input() bizDetails: BizDetails;

  public reviews: any[];
  // public reviews: Review[];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getReviews(this.bizDetails.id);
    // this.reviews = this._reviewService.getReviews();
  }

  getReviews(id: string) {
    let urlCall = `${GlobalConstants.API_URL}/reviews?id=${id}`;
    this.httpClient.get<any>(urlCall)
      .subscribe((data: any) => {
        data = data.reviews;
        this.reviews = data; //

        // console.log(this.reviews[0].id);
        for (let i = 0; i < data.length; i++) {
          this.reviews[i] = {
            'id': data[i].id,
            'username': data[i].user.name,
            'rating': 'Rating: ' + data[i].rating + '/5',
            'text': data[i].text,
            'date': data[i].time_created.substring(0, 10),
          }
        }
      });
  }


}


    // console.log(this.reviews[0]);


    // 'id': data.id,
    //   'username': data.user.name,
    //     'rating': data.rating + '/5',
    //       'text': data.text,
    //         'date': data.time_created.substring(0, 10),


    // this.reviews = review;
    // this.reviews[0] = (data[0]);
    // this.reviews[1] = (data[1]);
    // this.reviews[2] = (data[2]);
    // console.log(data);


