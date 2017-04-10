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
var board_factory_service_1 = require("./board.factory.service");
exports.GAME_STATE = {
    INIT: "init",
    ROUND_RUNNING_SHOW: "runningShow",
    ROUND_RUNNING_USERACTION: "runningUser",
    ROUND_FINISHED: "rFinished",
    GAME_FINISHED: "gameFinished"
};
var Game = (function () {
    function Game() {
        this.level = 0;
        this.state = exports.GAME_STATE.INIT;
    }
    return Game;
}());
exports.Game = Game;
var GameService = (function () {
    function GameService(factory) {
        this.factory = factory;
        this.activeGame = new Game();
    }
    GameService.prototype.getActiveGame = function () {
        return this.activeGame;
    };
    GameService.prototype.startNewGame = function () {
        this.activeGame = new Game();
        var rows = this.startNextRound();
        this.activeGame.rows = rows;
        return this.activeGame;
    };
    GameService.prototype.resetAll = function () {
        this.activeGame = new Game();
        this.activeGame.rows = [];
        return this.activeGame;
    };
    /**
     * starts a round by
     * - increasing the level
     * - generate the game field
     * - generate a random path on the board
     * - show the path the user for an amount of time
     * - hand control to the user
     */
    GameService.prototype.startNextRound = function () {
        var _this = this;
        console.log("GameService#start a new game");
        this.activeGame.level++;
        this.activeGame.state = exports.GAME_STATE.ROUND_RUNNING_SHOW;
        var size = this.activeGame.level + 3;
        var board = this.factory.getBoard(size);
        this.activeGame.rows = board;
        this.path = this.factory.createNewPath(board);
        this.totalPathLength = this.path.length;
        setTimeout(function () {
            console.log("GameService#fire timer. hide tiles");
            for (var i = 0; i < _this.path.length; i++) {
                _this.path[i].state = 0;
            }
            _this.activeGame.state = exports.GAME_STATE.ROUND_RUNNING_USERACTION;
        }, 5500 - (this.activeGame.level * 500));
        return board;
    };
    GameService.prototype.userAction = function (tile) {
        if (this.activeGame.state != exports.GAME_STATE.ROUND_RUNNING_USERACTION) {
            return;
        }
        console.log("User tried tile with id: " + tile.id + " and state " + tile.state);
        if (this.path[this.path.length - 1].id === tile.id) {
            console.log("User clicked the right tile");
            this.path.pop().state = 2;
            tile.state = 2;
            if (this.path.length == 0) {
                this.activeGame.state = exports.GAME_STATE.ROUND_FINISHED;
            }
        }
        else {
            tile.state = 3;
            var rowcol = tile.id.split("+");
            this.activeGame.rows[Number(rowcol[0])].tiles[Number(rowcol[1])].state = 3;
            this.activeGame.result = Math.round((((this.totalPathLength - this.path.length) / this.totalPathLength) * 100));
            this.activeGame.state = exports.GAME_STATE.GAME_FINISHED;
        }
    };
    GameService.prototype.getCurrentPath = function () {
        return this.path;
    };
    return GameService;
}());
GameService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [board_factory_service_1.BoardFactory])
], GameService);
exports.GameService = GameService;
//# sourceMappingURL=game.service.js.map