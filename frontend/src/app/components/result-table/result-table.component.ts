import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GlobalConstants } from 'src/app/global/global-constants';
import { SearchService } from 'src/app/services/search.service';
import { SearchResult } from 'src/app/shared/models/SearchResult';
GlobalConstants

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.css']
})
export class ResultTableComponent implements OnInit {
  public searchResult: any;

  constructor(private _searchService: SearchService) { }

  ngOnInit(): void {
    this.searchResult = this._searchService.getSearchResult();
  }

  @Output()
  notify: EventEmitter<string> = new EventEmitter<string>();

  showDetails(event: any, biz: any) {
    this.notify.emit(biz.id);
  }

}
