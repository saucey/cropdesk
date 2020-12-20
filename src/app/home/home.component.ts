import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import * as moment from 'moment'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  games = [];
  pageLinks = []

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getGames().subscribe((data: any) => {
      this.dataMapping(data)
      this.createPagination(data.count)
    })  
  }

  public createPagination(count) {
    let pageLength = count / 20
    Number.isInteger(pageLength) ? pageLength : pageLength++;
    pageLength = Math.trunc(pageLength)
    for (var i = 1; i < pageLength; i++) {
      this.pageLinks.push({index: i})
    }
  }

  public dataMapping(data) {
    console.log(data, 'dats')
    data.results.map(val => {
      val.released = moment(val.released).format('ll');
      return val;
    })
    const games = data.results
    this.games = games;
  }

  public goTo(pageIndex) {
      this.dataService.getGames(pageIndex).subscribe((data: any) => {
        this.dataMapping(data)
    })  
  }

}