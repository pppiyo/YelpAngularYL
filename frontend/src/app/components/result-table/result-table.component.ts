import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { SearchResult } from 'src/app/shared/models/SearchResult';


@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.css']
})
export class ResultTableComponent implements OnInit {
  public searchResult: any;
  public errorMsg: any;

  constructor(private _searchService: SearchService) { }

  ngOnInit(): void {
    this.searchResult = this._searchService.getSearchResult();
  }

  @Output()
  notify: EventEmitter<string> = new EventEmitter<string>();

  showDetails() {
    this.notify.emit("this is a message from re-table compo");
    // alert('hi details');
  }

}
