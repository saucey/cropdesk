import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import * as moment from 'moment'
import {GamesModel} from './games.interface'
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
    this.dataService.getGames().subscribe((data: GamesModel) => {
      this.dataMapping(data)
      this.createPagination(data.count)
    })  
  }

  public createPagination(count) {
    let pageLength = count / 20
    Number.isInteger(pageLength) ? pageLength : pageLength++;
    pageLength = Math.trunc(pageLength)
    for (var i = 1; i < pageLength; i++) {
      this.pageLinks.push({ index: i })
    }
    this.pageLinks.map((val, index) => {
      index === 0 ? val['selected'] = true : val['selected'] = false
    })
  }

  public dataMapping(data: GamesModel) {
    console.log(data, 'dats')
    data.results.map(val => {
      val.released = moment(val.released).format('ll');
      return val;
    })
    const games = data.results
    this.games = games;
  }

  public goTo(pageIndex) {
    console.log(pageIndex, 'clicked on')
    console.log(this.pageLinks, 'page obj')
      this.dataService.getGames(pageIndex).subscribe((data: any) => {
        this.dataMapping(data)
        this.pageLinks.map((val) => {
          val.index === pageIndex ? val['selected'] = true : val['selected'] = false
      })
    }) 
  }

}