import { Component,Input,Output,EventEmitter } from '@angular/core';

export class TileModel
{
    id:string;
    state:number;
}

@Component({
  selector: 'tile',
  template: `<div [ngClass]="['singleTile' , getColor()]" (click)="tileClicked()"></div>`,
  styles:[`

  .singleTile
  {
      height:100%;
      transition:background-color 1s;
  }

  .grey
  {
      background-color:grey;
  }
    .red
  {
      background-color:red;
  }
    .green
  {
      background-color:green;    
  }
    .orange
  {
      background-color:orange;
  }

  `]
})
export class Tile
{
  @Input()
  id:string;

  @Input()
  state:number;
  
  @Output()
  tileClick:EventEmitter<Tile> = new EventEmitter();

  getColor()
  {
      if(this.state == 0)
      {
          return "grey";
      }

      if(this.state == 1)
      {
          return "orange";
      }

      if(this.state == 2)
      {
          return "green";
      }

      if(this.state == 3)
      {
          return "red";
      }
  }
    

    tileClicked()
    {
        this.tileClick.emit(this);
    }

}

 