import {Component,OnInit} from '@angular/core';
import {HighscoreService,Entry} from '../services/highscore.service';




@Component
({
    selector:'score',
    template:`
    <h1>the best of the best<h1>
    <div class="scorebox">
    <ol>
    <li *ngFor="let item of entries" [style.font-size.%]="'50'">
    {{item.getName()}}: {{item.getScoreString()}}
    </li>
    </ol>
    </div>

    `,
    styles:[`
        .scorebox
        {
            margin-left:5%;
            width:90%;
        }
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
