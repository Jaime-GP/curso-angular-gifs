import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent {

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor(private gifsService:GifsService){}

  public searchTag():void{
    //capturamos
    const newTag :string= this.tagInput.nativeElement.value;
    //añadimos
    this.gifsService.searchTag(newTag);
    //limpiamos componente
    this.tagInput.nativeElement.value='';

    console.log({newTag});
  }
}
