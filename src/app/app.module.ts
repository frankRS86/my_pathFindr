import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';

import { AppComponent }  from './app.component';
import {BoardComponent} from './views/board.component';
import {Tile} from './views/tile.component';
import {GameService} from './services/game.service';
import {BoardFactory} from './services/board.factory.service';
import {HighscoreService} from './services/highscore.service';
import {Scoreboard} from './views/score.component';

@NgModule({
  imports:      [ BrowserModule,FormsModule,
  RouterModule.forRoot([
  {
    path: 'scoreboard',
    component: Scoreboard
  },
    {
    path: '',
    component: BoardComponent
  }
])],
  declarations: [ AppComponent,BoardComponent,Tile,Scoreboard ],
  providers: [GameService,BoardFactory,HighscoreService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
