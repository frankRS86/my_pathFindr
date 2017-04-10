"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var game_service_1 = require("../services/game.service");
var highscore_service_1 = require("../services/highscore.service");
var BoardComponent = (function () {
    function BoardComponent(gameService, highscoreService) {
        this.gameService = gameService;
        this.highscoreService = highscoreService;
        this.rows = new Array();
    }
    BoardComponent.prototype.ngOnInit = function () {
        this.activeGame = this.gameService.getActiveGame();
        if (this.activeGame.rows != undefined) {
            this.rows = this.activeGame.rows;
            this.tileSize = 100 / (this.rows.length) - 5;
        }
    };
    BoardComponent.prototype.tileClicked = function (tile) {
        console.log("tile clicked: " + tile);
        this.gameService.userAction(tile);
    };
    BoardComponent.prototype.startNewGame = function () {
        this.activeGame = this.gameService.startNewGame();
        this.rows = this.activeGame.rows;
        this.tileSize = 100 / (this.rows.length) - 5;
    };
    BoardComponent.prototype.continueGame = function () {
        this.rows = this.gameService.startNextRound();
        this.tileSize = 100 / (this.rows.length) - 5;
    };
    BoardComponent.prototype.save = function () {
        this.highscoreService.save(this.playerName, this.activeGame);
        this.activeGame = new game_service_1.Game();
    };
    return BoardComponent;
}());
BoardComponent = __decorate([
    core_1.Component({
        selector: 'board',
        templateUrl: './board.component.html',
        styles: ["\n  .box{\n    width:80%;\n    height:100%;\n    margin-left:15%;\n    white-space: nowrap;\n  }\n\n  .cell{\n  display:inline-block;\n  border-style:groove;\n  height:100%;\n}\n\n.button {\n    color: #559;\n    font-family: Arial, Helvetica, sans-serif;\n    font-size:100%;\n    background: #abe4f8;\n    border: solid 1px #8cc5d9;\n    box-shadow: inset 0 0 0 1px #cdeffb;\n    text-shadow: 0 1px 0 #b6e6f9; }  \n\n  "],
    }),
    __metadata("design:paramtypes", [game_service_1.GameService, highscore_service_1.HighscoreService])
], BoardComponent);
exports.BoardComponent = BoardComponent;
//# sourceMappingURL=board.component.js.map