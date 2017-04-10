import {Component,OnInit} from '@angular/core';
import {HighscoreService,Entry} from '../services/highscore.service';




@Component
({
    selector:'score',
    template:`
    <h1>the best of the best<h1>
    <ol>
    <li *ngFor="let item of entries">
    {{item.getName()}}: {{item.getScoreString()}}
    </li>
    </ol>

    `,
    styles:[`
        
    `]

})
export class Scoreboard implements OnInit
{
    entries:Entry[] = [];

    constructor(private highscoreService:HighscoreService)
    {
        console.log("Scoreboard constructor called");      
    }

    ngOnInit()
    {
        this.highscoreService.getCurrentHighscores().subscribe((scores:Entry[]) => 
        {
        console.log("Scoreboard#onAcoreChanged length: "+scores.length)
        this.entries = scores;

        for(let i = 0; i < this.entries.length; i++)
        {
            console.log(i+": "+this.entries[i].getName());
        }
        });
    }

}
