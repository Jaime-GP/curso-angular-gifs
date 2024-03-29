import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'share-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private gifsService:GifsService){}

  get tagsHistory(): string[] {
    return this.gifsService.tagsHistory;
  }

  public searchTag(tag:string):void{
    this.gifsService.searchTag(tag);
  }

}
