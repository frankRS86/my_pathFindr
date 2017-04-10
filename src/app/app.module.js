"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var app_component_1 = require("./app.component");
var board_component_1 = require("./views/board.component");
var tile_component_1 = require("./views/tile.component");
var game_service_1 = require("./services/game.service");
var board_factory_service_1 = require("./services/board.factory.service");
var highscore_service_1 = require("./services/highscore.service");
var score_component_1 = require("./views/score.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule,
            router_1.RouterModule.forRoot([
                {
                    path: 'scoreboard',
                    component: score_component_1.Scoreboard
                },
                {
                    path: '',
                    component: board_component_1.BoardComponent
                }
            ])],
        declarations: [app_component_1.AppComponent, board_component_1.BoardComponent, tile_component_1.Tile, score_component_1.Scoreboard],
        providers: [game_service_1.GameService, board_factory_service_1.BoardFactory, highscore_service_1.HighscoreService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map