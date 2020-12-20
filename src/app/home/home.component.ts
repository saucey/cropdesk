import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  games = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {

    this.dataService.sendGetRequest().subscribe((data: any) => {
      const games = data.results
      this.games = games;
      console.log(this.games, 'the games')
    })  
  }

}