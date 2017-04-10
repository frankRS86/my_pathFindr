import { Component,OnInit } from '@angular/core';
import {Tile,TileModel} from '../views/tile.component';
import {GameService,Game} from '../services/game.service';
import {HighscoreService} from '../services/highscore.service';

@Component({
  selector: 'board',
  templateUrl:'./board.component.html',
  styleUrls:['./board.component.css']
  ,
})
export class BoardComponent implements OnInit 
{ 

rows = new Array();
tileSize:number;
activeGame:Game;
playerName:string;
placeholder:string = "enter your name";
solving:boolean;

constructor(private gameService:GameService,private highscoreService:HighscoreService)
{

}

ngOnInit()
{
  this.activeGame = this.gameService.getActiveGame();
  
  if(this.activeGame.rows != undefined)
  {
  this.rows = this.activeGame.rows;
  this.tileSize = 100/(this.rows.length) -5;
  }
}

tileClicked(tile:Tile)
{
  this.gameService.userAction(tile);
}

startNewGame()
{
  this.activeGame  = this.gameService.startNewGame();
  this.rows = this.activeGame.rows;
  this.tileSize = 100/(this.rows.length) -5;

}

continueGame()
{
  this.rows = this.gameService.startNextRound();
  this.tileSize = 100/(this.rows.length) -5;
}

save()
{
    if(this.highscoreService.save(this.playerName,this.activeGame))
    {
      this.activeGame = this.gameService.resetAll();
      this.rows = this.activeGame.rows;
      this.placeholder = "enter your name please"
    }
    else{
      this.placeholder = "enter your name please!!!!!!!!!!!!!!!"
    }
}

solve()
{
   this.solving = true;
   let path:TileModel[] = this.gameService.getCurrentPath();

    var interval = setInterval(() => {

      if(path.length == 0)
      {
        this.solving = false; 
        clearInterval(interval);
        return;
      }

      let t = path[path.length-1];
      this.gameService.userAction({id:t.id,state:0,tileClicked:undefined,getColor:undefined,tileClick:undefined});
      
    },1500);

}

}

