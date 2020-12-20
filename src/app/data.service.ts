import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = "https://api.rawg.io/api/games?dates=2010-01-01,2020-12-31&developers=4132";

  constructor(private httpClient: HttpClient) { }

  public getGames(pageIndex = 1){
    return this.httpClient.get(this.REST_API_SERVER + '&page=' + pageIndex);
  }
}