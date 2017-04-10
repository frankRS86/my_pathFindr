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
        this.placeholder = "enter your name";
    }
    BoardComponent.prototype.ngOnInit = function () {
        this.activeGame = this.gameService.getActiveGame();
        if (this.activeGame.rows != undefined) {
            this.rows = this.activeGame.rows;
            this.tileSize = 100 / (this.rows.length) - 5;
        }
    };
    BoardComponent.prototype.tileClicked = function (tile) {
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
        if (this.highscoreService.save(this.playerName, this.activeGame)) {
            this.activeGame = this.gameService.resetAll();
            this.rows = this.activeGame.rows;
            this.placeholder = "enter your name please";
        }
        else {
            this.placeholder = "enter your name please!!!!!!!!!!!!!!!";
        }
    };
    BoardComponent.prototype.solve = function () {
        var _this = this;
        this.solving = true;
        var path = this.gameService.getCurrentPath();
        var interval = setInterval(function () {
            if (path.length == 0) {
                _this.solving = false;
                clearInterval(interval);
                return;
            }
            var t = path[path.length - 1];
            _this.gameService.userAction({ id: t.id, state: 0, tileClicked: undefined, getColor: undefined, tileClick: undefined });
        }, 1500);
    };
    return BoardComponent;
}());
BoardComponent = __decorate([
    core_1.Component({
        selector: 'board',
        templateUrl: './board.component.html',
        styleUrls: ['./board.component.css'],
    }),
    __metadata("design:paramtypes", [game_service_1.GameService, highscore_service_1.HighscoreService])
], BoardComponent);
exports.BoardComponent = BoardComponent;
//# sourceMappingURL=board.component.js.map