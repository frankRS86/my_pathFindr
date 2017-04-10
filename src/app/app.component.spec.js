"use strict";
var app_component_1 = require("./app.component");
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var testing_2 = require("@angular/router/testing");
describe('AppComponent', function () {
    var de;
    var router_board;
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [app_component_1.AppComponent],
            imports: [testing_2.RouterTestingModule]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement.query(platform_browser_1.By.css('h1'));
        router_board = fixture.debugElement.queryAll(platform_browser_1.By.css('a'));
    });
    it('should create component', function () { return expect(comp).toBeDefined(); });
    it('should have <h1> text PathFindr', function () {
        fixture.detectChanges();
        var h1 = de.nativeElement;
        expect(h1.innerText).toMatch("PathFindr", '<h1> should say Welcome to Pathfindr');
    });
    it('router elements should exist', function () {
        fixture.detectChanges();
        expect(router_board).toBeDefined();
    });
    it('should have 2 routerLink on board', function () {
        fixture.detectChanges();
        expect(router_board.length).toMatch("2", 'routerLink should contain 2 links');
    });
});
//# sourceMappingURL=app.component.spec.js.map