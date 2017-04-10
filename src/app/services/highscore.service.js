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
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var Entry = (function () {
    function Entry(playerName, result) {
        this.playerName = playerName;
        this.result = result;
    }
    Entry.prototype.getName = function () {
        return this.playerName;
    };
    Entry.prototype.getScore = function () {
        return this.result;
    };
    Entry.prototype.getScoreString = function () {
        return "level: " + this.result.level + ": " + this.result.result + "% of tiles";
    };
    Entry.prototype.equals = function (other) {
        if (this.result.level < other.result.level) {
            return 1;
        }
        if (this.result.level > other.result.level) {
            return -1;
        }
        //level is the same. compare tiles completed
        if (this.result.result > other.result.result) {
            return -1;
        }
        if (this.result.result < other.result.result) {
            return 1;
        }
        return 0;
    };
    return Entry;
}());
exports.Entry = Entry;
var HighscoreService = (function () {
    function HighscoreService() {
        this.board = [];
        this.currentHighscore = new BehaviorSubject_1.BehaviorSubject([]);
    }
    HighscoreService.prototype.getCurrentHighscores = function () {
        return this.currentHighscore.asObservable();
    };
    HighscoreService.prototype.save = function (name, gameResult) {
        console.log("HighscoreService#save highscore for player " + name);
        var entry = new Entry(name, gameResult);
        this.board.push(entry);
        this.board.sort(this.compare);
        this.currentHighscore.next(this.board);
    };
    HighscoreService.prototype.compare = function (a, b) {
        return a.equals(b);
    };
    return HighscoreService;
}());
HighscoreService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], HighscoreService);
exports.HighscoreService = HighscoreService;
//# sourceMappingURL=highscore.service.js.map