import { Component,OnInit } from '@angular/core';
import {Tile} from '../views/tile.component';
import {GameService,GameResult,Game} from '../services/game.service';
import {HighscoreService} from '../services/highscore.service';

@Component({
  selector: 'board',
  templateUrl:'./board.component.html',
  styles:[`
  .box{
    width:80%;
    height:100%;
    margin-left:15%;
    white-space: nowrap;
  }

  .cell{
  display:inline-block;
  border-style:groove;
  height:100%;
}

.button {
    color: #559;
    font-family: Arial, Helvetica, sans-serif;
    font-size:100%;
    background: #abe4f8;
    border: solid 1px #8cc5d9;
    box-shadow: inset 0 0 0 1px #cdeffb;
    text-shadow: 0 1px 0 #b6e6f9; }  

  `]
  ,
})
export class BoardComponent implements OnInit 
{ 

rows = new Array();
tileSize:number;
activeGame:Game;
playerName:string;

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
  console.log("tile clicked: "+tile);
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
    this.highscoreService.save(this.playerName,this.activeGame);
    this.activeGame = new Game();
}

}

