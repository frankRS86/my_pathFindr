import{Component} from '@angular/core';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'pathfindr-app',
  template: `
  <div class="header">
  <h1>Welcome to PathFindr</h1>
  <a routerLink="/">board</a>
  <a routerLink="/scoreboard">highscores</a>
  </div>
  <router-outlet margin-top="20pt"></router-outlet>`,
  styles:[`

.header
{
  border-bottom: 1px solid;
  margin:-15px auto 0 auto;
  padding-top:10px;
  text-align:center;
  background-color:#eef;
}

a
{

font-size:20px;
}

`]
})
export class AppComponent
{


}