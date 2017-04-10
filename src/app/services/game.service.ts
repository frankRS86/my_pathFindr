import{Injectable} from '@angular/core';
import {Tile,TileModel} from '../views/tile.component';
import {BoardFactory,Row} from './board.factory.service';
import {Observable} from 'rxjs/Observable';

export const GAME_STATE =
{
   INIT:"init",
   ROUND_RUNNING_SHOW:"runningShow",
   ROUND_RUNNING_USERACTION:"runningUser",
   ROUND_FINISHED:"rFinished",
   GAME_FINISHED:"gameFinished"
   
}

export class GameResult
{
    finsihed:boolean; 
    success:boolean;
    levelReached:number;
    tilesCorrect:number;
}

export class Game
{
  state:string;
  level:number;
  result:number;
  rows:Row[];

  constructor()
  {
    this.level = 0;
    this.state = GAME_STATE.INIT;
  }
}

@Injectable()
export class GameService
{

constructor(private factory:BoardFactory)
{

}

path:TileModel[];
totalPathLength:number;
activeGame:Game = new Game();

getActiveGame()
{
    return this.activeGame;
}

startNewGame()
{
    this.activeGame = new Game();
    let rows = this.startNextRound();
    this.activeGame.rows = rows;

    return this.activeGame;
}

startNextRound():Row[]
{
    console.log("GameService#start a new game");
    
    this.activeGame.level++;
    this.activeGame.state = GAME_STATE.ROUND_RUNNING_SHOW;
    var size:number = this.activeGame.level + 3;
    
    var board:Row[] = this.factory.getBoard(size);
    this.activeGame.rows = board;
    this.path = this.factory.createNewPath(board);
    this.totalPathLength = this.path.length;

    console.log("GameService#path-length = "+this.path.length);

    setTimeout(() =>{
    console.log("GameService#fire timer. hide tiles");
        for(var i = 0; i < this.path.length;i++)
        {
            this.path[i].state = 0; 
        }
         this.activeGame.state = GAME_STATE.ROUND_RUNNING_USERACTION;


    },5500 - (this.activeGame.level*500));

    return board;
}

userAction(tile:Tile)
{
    if(this.activeGame.state != GAME_STATE.ROUND_RUNNING_USERACTION)
    {
        return;
    }

    console.log("User tried tile with id: "+tile.id+" and state "+tile.state);
    
    if(this.path[this.path.length-1].id === tile.id)
    {
        console.log("User clicked the right tile");
        this.path.pop().state = 2;
        tile.state = 2;

        if(this.path.length == 0)
        {
            this.activeGame.state = GAME_STATE.ROUND_FINISHED;
        }
    }
    else
    {
        tile.state = 3;
        let rowcol:string[] = tile.id.split("+");
        this.activeGame.rows[Number(rowcol[0])].tiles[Number(rowcol[1])].state = 3;
        this.activeGame.result = Math.round((((this.totalPathLength - this.path.length)/this.totalPathLength)*100));
        this.activeGame.state = GAME_STATE.GAME_FINISHED;  
    }

}


}