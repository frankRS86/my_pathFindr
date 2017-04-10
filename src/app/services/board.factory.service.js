"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var Row = (function () {
    function Row() {
        this.tiles = [];
    }
    return Row;
}());
exports.Row = Row;
var BoardFactory = (function () {
    function BoardFactory() {
    }
    BoardFactory.prototype.getBoard = function (size) {
        var rows = [];
        console.log("creating new Field with size: " + size);
        for (var i = 0; i < size; i++) {
            var row = new Row();
            for (var y = 0; y < size; y++) {
                var tile = { state: 0, id: i + "+" + y };
                row.tiles.push(tile);
            }
            rows.push(row);
        }
        return rows;
    };
    BoardFactory.prototype.createNewPath = function (board) {
        var path = [];
        var currentIndex = this.getRandomNumber(board.length - 1);
        for (var i = 0; i < board.length; i++) {
            board[i].tiles[currentIndex].state = 1;
            path.push(board[i].tiles[currentIndex]);
            if (i == board.length - 1) {
                break;
            }
            var row = board[i];
            while (1) {
                var nextIndex = this.determineNextField(currentIndex, row.tiles, i > 0 ? board[i - 1].tiles : undefined);
                console.log("createPath next index: " + nextIndex);
                if (currentIndex == nextIndex) {
                    break;
                }
                row.tiles[nextIndex].state = 1;
                path.push(row.tiles[nextIndex]);
                currentIndex = nextIndex;
            }
        }
        console.log("createPath new path with " + path.length + " steps");
        return path;
    };
    BoardFactory.prototype.determineNextField = function (currentTile, row, lastRow) {
        var possibilities = [];
        //this represents the next row
        possibilities.push(currentTile);
        //check the left neighbor
        if ((currentTile - 1) >= 0 && row[currentTile - 1].state == 0) {
            if (lastRow == undefined || lastRow[currentTile - 1].state == 0) {
                possibilities.push(currentTile - 1);
            }
        }
        //check the right neighbor
        if ((currentTile + 1) < row.length && row[currentTile + 1].state == 0) {
            if (lastRow == undefined || lastRow[currentTile + 1].state == 0) {
                possibilities.push(currentTile + 1);
            }
        }
        var action = this.getRandomNumber(possibilities.length - 1);
        return possibilities[action];
    };
    BoardFactory.prototype.getRandomNumber = function (max) {
        return Math.round((Math.random() * max));
    };
    return BoardFactory;
}());
BoardFactory = __decorate([
    core_1.Injectable()
], BoardFactory);
exports.BoardFactory = BoardFactory;
//# sourceMappingURL=board.factory.service.js.map