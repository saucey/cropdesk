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

  constructor(private dataService: DataService) { }

  ngOnInit() {

    
    this.dataService.sendGetRequest().subscribe((data: any) => {
      
      data.results.map(val => {
        val.released = moment(val.released).format('ll');
        return val;
      })
      
      console.log(data, 'reponse after')


      // myDate = moment(someDate).format('MM/DD/YYYY HH:mm');

      const games = data.results
      this.games = games;
      console.log(this.games, 'the games')
    })  
  }

}