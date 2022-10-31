import { Component, OnInit } from '@angular/core';
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

}
