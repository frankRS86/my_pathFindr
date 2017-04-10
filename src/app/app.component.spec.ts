import { AppComponent } from './app.component';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterModule }   from '@angular/router';
import { RouterTestingModule }   from '@angular/router/testing';

describe('AppComponent', function () {
  let de: DebugElement;
  let router_board: DebugElement[];
 
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
    
    de = fixture.debugElement.query(By.css('h1'));
    router_board = fixture.debugElement.queryAll(By.css('a'));
  });

  it('should create component', () => expect(comp).toBeDefined() );

  it('should have <h1> text PathFindr', () => {
    fixture.detectChanges();
    const h1 = de.nativeElement;
    expect(h1.innerText).toMatch("PathFindr",
      '<h1> should say Welcome to Pathfindr');
  });

    it('router elements should exist', () => {
    fixture.detectChanges();
    expect(router_board).toBeDefined();
  });

  it('should have 2 routerLink on board', () => {
    fixture.detectChanges();
    expect(router_board.length).toMatch("2",
      'routerLink should contain 2 links');
  });

});
