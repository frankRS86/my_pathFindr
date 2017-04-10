import{Component} from '@angular/core';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'pathfindr-app',
  template: `
  <h1>Welcome to PathFindr</h1>
  <a routerLink="/">board</a>
  <a routerLink="/scoreboard">highscores</a>
  <router-outlet margin-top="20pt"></router-outlet>`,
  styles:[``]
})
export class AppComponent
{


}