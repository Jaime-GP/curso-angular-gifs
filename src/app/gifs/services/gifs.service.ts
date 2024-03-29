import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';
import { compileNgModule } from '@angular/compiler';

const GYPFY_API_KEY: string = '4Nr3g1Z4154tLZDY5r9GTZZ5zRKXhCKU';
const SERVICE_URL: string = 'https://api.giphy.com/v1/gifs/';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string): void {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag != tag);
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    const data = localStorage.getItem('history');
    if (!data) {
      return;
    }
    this._tagsHistory = JSON.parse(data);

    if (this._tagsHistory.length === 0) {
      return;
    }
    this.searchTag(this._tagsHistory[0]);
  }

  public searchTag(tag: string): void {
    if (tag.length === 0) {
      return;
    }
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', GYPFY_API_KEY)
      .set('limit', '12')
      .set('q', tag);

    this.http
      .get<SearchResponse>(`${SERVICE_URL}search?`, { params: params })
      .subscribe((resp) => {
        this.gifList = resp.data;
        //console.log({gifs:this.gifList});
      });
  }
}
