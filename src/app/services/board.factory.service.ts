import{Injectable} from '@angular/core';
import {TileModel} from '../views/tile.component';

export class Row
{
    public tiles:TileModel[] = [];
}


@Injectable()
export class BoardFactory
{


getBoard(size:number)
{
 var rows:Row[] = [];

  console.log("creating new Field with size: "+size)

  for(var i = 0; i < size ;i ++)
  {
    var row:Row = new Row();
    for(var y = 0; y < size; y++)
    {
      var tile = {state:0,id:i+"+"+y};
      row.tiles.push(tile);
    }

    rows.push(row);
  }

return rows;
}

createNewPath(board:Row[]):TileModel[]
{
 let path:TileModel[] = [];

 var currentIndex:number = this.getRandomNumber(board.length-1);
 
 for(let i = 0; i < board.length;i++)
 {
   board[i].tiles[currentIndex].state = 1;
   path.push(board[i].tiles[currentIndex]);
   if(i == board.length-1)
   {
       break;
   }

   let row:Row = board[i]; 
    while(1)
    {
        var nextIndex = this.determineNextField(currentIndex,row.tiles,i>0?board[i-1].tiles:undefined);
        console.log("createPath next index: "+nextIndex);
        
        if(currentIndex == nextIndex)
        {
            break;
        }
        row.tiles[nextIndex].state = 1;
        path.push(row.tiles[nextIndex]);
        currentIndex = nextIndex;
    }
 }

 console.log("createPath new path with "+path.length+" steps");
 return path;
}

private determineNextField(currentTile:number,row:TileModel[],lastRow:TileModel[]):number
{
    var possibilities:number[] = [];

    //this represents the next row
    possibilities.push(currentTile);

    //check the left neighbor
    if((currentTile - 1) >= 0 && row[currentTile -1].state == 0)
    {
        if(lastRow == undefined || lastRow[currentTile - 1].state == 0)
        {
            possibilities.push(currentTile-1);
        }
    }

    //check the right neighbor
    if((currentTile + 1) < row.length && row[currentTile +1].state == 0)
    {
        if(lastRow == undefined || lastRow[currentTile + 1].state == 0)
        {
        possibilities.push(currentTile+1);
        }
    }

    var action:number = this.getRandomNumber(possibilities.length-1);

    return possibilities[action];
   
}

private getRandomNumber(max:number):number
{
    return Math.round((Math.random() * max));
}

}