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
var highscore_service_1 = require("../services/highscore.service");
var Scoreboard = (function () {
    function Scoreboard(highscoreService) {
        this.highscoreService = highscoreService;
        this.entries = [];
        console.log("Scoreboard constructor called");
    }
    Scoreboard.prototype.ngOnInit = function () {
        var _this = this;
        this.highscoreService.getCurrentHighscores().subscribe(function (scores) {
            console.log("Scoreboard#onAcoreChanged length: " + scores.length);
            _this.entries = scores;
            for (var i = 0; i < _this.entries.length; i++) {
                console.log(i + ": " + _this.entries[i].getName());
            }
        });
    };
    return Scoreboard;
}());
Scoreboard = __decorate([
    core_1.Component({
        selector: 'score',
        template: "\n    <h1>the best of the best<h1>\n    <ol>\n    <li *ngFor=\"let item of entries\">\n    {{item.getName()}}: {{item.getScoreString()}}\n    </li>\n    </ol>\n\n    ",
        styles: ["\n        \n    "]
    }),
    __metadata("design:paramtypes", [highscore_service_1.HighscoreService])
], Scoreboard);
exports.Scoreboard = Scoreboard;
//# sourceMappingURL=score.component.js.map