import {Injectable} from '@angular/core';
import {Game} from './game.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

export class Entry
{
    constructor(private playerName:string,private result:Game)
    {

    }

    getName()
    {
        return this.playerName;
    }

    getScore()
    {
        return this.result;
    }

    getScoreString():string
    {
        return "level: "+this.result.level+": "+this.result.result+"% of tiles"
    }

    equals(other:Entry):number
    {
        if(other == undefined)
        {
            return -1;
        }

        if(this.result.level < other.result.level)
        {
            return 1;
        }

        if(this.result.level > other.result.level)
        {
            return -1;
        }

        //level is the same. compare tiles completed

        if(this.result.result > other.result.result)
        {
            return -1;
        }

        if(this.result.result < other.result.result)
        {
            return 1;
        }

        return 0;

    }
}

@Injectable()
export class HighscoreService
{
    board:Entry[] = [];
    currentHighscore: BehaviorSubject<Entry[]>; 

    constructor()
    {
        this.currentHighscore = new BehaviorSubject<Entry[]>([]);
    }

    getCurrentHighscores():Observable<Entry[]>
    {
        return this.currentHighscore.asObservable();
    }

    save(name:string, gameResult:Game):boolean
    {
        if(name == undefined || name.length == 0 || gameResult == undefined || gameResult.level < 0 || gameResult.result < 0 
        || gameResult.result > 100)
        {
            return false;
        }
        console.log("HighscoreService#save highscore for player "+name);

        var entry:Entry = new Entry(name,gameResult);

        this.board.push(entry);
        this.board.sort(this.compare);

        this.currentHighscore.next(this.board);

        return true;
    }

    compare(a:Entry,b:Entry):number
    {
        return a.equals(b);
    }

}