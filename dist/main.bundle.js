webpackJsonp([1,4],{

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__);
/* unused harmony export Entry */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HighscoreService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


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
        if (other == undefined) {
            return -1;
        }
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
var HighscoreService = (function () {
    function HighscoreService() {
        this.board = [];
        this.currentHighscore = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"]([]);
    }
    HighscoreService.prototype.getCurrentHighscores = function () {
        return this.currentHighscore.asObservable();
    };
    HighscoreService.prototype.save = function (name, gameResult) {
        if (name == undefined || name.length == 0 || gameResult == undefined || gameResult.level < 0 || gameResult.result < 0
            || gameResult.result > 100) {
            return false;
        }
        console.log("HighscoreService#save highscore for player " + name);
        var entry = new Entry(name, gameResult);
        this.board.push(entry);
        this.board.sort(this.compare);
        this.currentHighscore.next(this.board);
        return true;
    };
    HighscoreService.prototype.compare = function (a, b) {
        return a.equals(b);
    };
    HighscoreService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* Injectable */])(), 
        __metadata('design:paramtypes', [])
    ], HighscoreService);
    return HighscoreService;
}());
//# sourceMappingURL=/Users/admin/Documents/Aptana Studio 3 Workspace/my_pathFindr/src/highscore.service.js.map

/***/ }),

/***/ 315:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* unused harmony export Row */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BoardFactory; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var Row = (function () {
    function Row() {
        this.tiles = [];
    }
    return Row;
}());
var BoardFactory = (function () {
    function BoardFactory() {
    }
    BoardFactory.prototype.getBoard = function (size) {
        if (size < 4) {
            return undefined;
        }
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
        if (board == undefined) {
            return path;
        }
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
    BoardFactory = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* Injectable */])(), 
        __metadata('design:paramtypes', [])
    ], BoardFactory);
    return BoardFactory;
}());
//# sourceMappingURL=/Users/admin/Documents/Aptana Studio 3 Workspace/my_pathFindr/src/board.factory.service.js.map

/***/ }),

/***/ 316:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__board_factory_service__ = __webpack_require__(315);
/* unused harmony export GAME_STATE */
/* unused harmony export Game */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GameService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GAME_STATE = {
    INIT: "init",
    ROUND_RUNNING_SHOW: "runningShow",
    ROUND_RUNNING_USERACTION: "runningUser",
    ROUND_FINISHED: "rFinished",
    GAME_FINISHED: "gameFinished"
};
var Game = (function () {
    function Game() {
        this.level = 0;
        this.state = GAME_STATE.INIT;
    }
    return Game;
}());
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
        this.activeGame.state = GAME_STATE.ROUND_RUNNING_SHOW;
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
            _this.activeGame.state = GAME_STATE.ROUND_RUNNING_USERACTION;
        }, 5500 - (this.activeGame.level * 500));
        return board;
    };
    GameService.prototype.userAction = function (tile) {
        if (this.activeGame.state != GAME_STATE.ROUND_RUNNING_USERACTION) {
            return;
        }
        console.log("User tried tile with id: " + tile.id + " and state " + tile.state);
        if (this.path[this.path.length - 1].id === tile.id) {
            console.log("User clicked the right tile");
            this.path.pop().state = 2;
            tile.state = 2;
            if (this.path.length == 0) {
                this.activeGame.state = GAME_STATE.ROUND_FINISHED;
            }
        }
        else {
            tile.state = 3;
            var rowcol = tile.id.split("+");
            this.activeGame.rows[Number(rowcol[0])].tiles[Number(rowcol[1])].state = 3;
            this.activeGame.result = Math.round((((this.totalPathLength - this.path.length) / this.totalPathLength) * 100));
            this.activeGame.state = GAME_STATE.GAME_FINISHED;
        }
    };
    GameService.prototype.getCurrentPath = function () {
        return this.path;
    };
    GameService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__board_factory_service__["a" /* BoardFactory */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__board_factory_service__["a" /* BoardFactory */]) === 'function' && _a) || Object])
    ], GameService);
    return GameService;
    var _a;
}());
//# sourceMappingURL=/Users/admin/Documents/Aptana Studio 3 Workspace/my_pathFindr/src/game.service.js.map

/***/ }),

/***/ 369:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 369;


/***/ }),

/***/ 370:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_app_module__ = __webpack_require__(486);


__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=/Users/admin/Documents/Aptana Studio 3 Workspace/my_pathFindr/src/main.js.map

/***/ }),

/***/ 485:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Component */])({
            selector: 'pathfindr-app',
            template: "\n  <div class=\"header\">\n  <h1>Welcome to PathFindr</h1>\n  <a routerLink=\"/\">board</a>\n  <a routerLink=\"/scoreboard\">highscores</a>\n  </div>\n  <router-outlet margin-top=\"20pt\"></router-outlet>",
            styles: ["\n\n.header\n{\n  border-bottom: 1px solid;\n  margin:-15px auto 0 auto;\n  padding-top:10px;\n  text-align:center;\n  background-color:#eef;\n}\n\na\n{\n\nfont-size:20px;\n}\n\n"]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=/Users/admin/Documents/Aptana Studio 3 Workspace/my_pathFindr/src/app.component.js.map

/***/ }),

/***/ 486:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(448);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(474);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(485);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__views_board_component__ = __webpack_require__(487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__views_tile_component__ = __webpack_require__(489);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_game_service__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_board_factory_service__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_highscore_service__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__views_score_component__ = __webpack_require__(488);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* RouterModule */].forRoot([
                    {
                        path: 'scoreboard',
                        component: __WEBPACK_IMPORTED_MODULE_10__views_score_component__["a" /* Scoreboard */]
                    },
                    {
                        path: '',
                        component: __WEBPACK_IMPORTED_MODULE_5__views_board_component__["a" /* BoardComponent */]
                    }
                ])],
            declarations: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */], __WEBPACK_IMPORTED_MODULE_5__views_board_component__["a" /* BoardComponent */], __WEBPACK_IMPORTED_MODULE_6__views_tile_component__["a" /* Tile */], __WEBPACK_IMPORTED_MODULE_10__views_score_component__["a" /* Scoreboard */]],
            providers: [__WEBPACK_IMPORTED_MODULE_7__services_game_service__["a" /* GameService */], __WEBPACK_IMPORTED_MODULE_8__services_board_factory_service__["a" /* BoardFactory */], __WEBPACK_IMPORTED_MODULE_9__services_highscore_service__["a" /* HighscoreService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/Users/admin/Documents/Aptana Studio 3 Workspace/my_pathFindr/src/app.module.js.map

/***/ }),

/***/ 487:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_game_service__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_highscore_service__ = __webpack_require__(207);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BoardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



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
    BoardComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Component */])({
            selector: 'board',
            template: __webpack_require__(644),
            styles: [__webpack_require__(643)],
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_game_service__["a" /* GameService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_game_service__["a" /* GameService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_highscore_service__["a" /* HighscoreService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_highscore_service__["a" /* HighscoreService */]) === 'function' && _b) || Object])
    ], BoardComponent);
    return BoardComponent;
    var _a, _b;
}());
//# sourceMappingURL=/Users/admin/Documents/Aptana Studio 3 Workspace/my_pathFindr/src/board.component.js.map

/***/ }),

/***/ 488:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_highscore_service__ = __webpack_require__(207);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Scoreboard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


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
    Scoreboard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Component */])({
            selector: 'score',
            template: "\n\n    <div class=\"container\">\n    <h1>the best of the best<h1>\n    <div class=\"scorebox\">\n        <ol>\n        <li *ngFor=\"let item of entries\" [style.font-size.%]=\"'50'\">\n        {{item.getName()}}: {{item.getScoreString()}}\n        </li>\n        </ol></div>\n    ",
            styles: ["\n        .scorebox\n        {\n            width:50%;\n            margin: 0 auto 0 auto;\n        }\n\n        .container\n        {\n            text-align:center;\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_highscore_service__["a" /* HighscoreService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_highscore_service__["a" /* HighscoreService */]) === 'function' && _a) || Object])
    ], Scoreboard);
    return Scoreboard;
    var _a;
}());
//# sourceMappingURL=/Users/admin/Documents/Aptana Studio 3 Workspace/my_pathFindr/src/score.component.js.map

/***/ }),

/***/ 489:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* unused harmony export TileModel */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Tile; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TileModel = (function () {
    function TileModel() {
    }
    return TileModel;
}());
var Tile = (function () {
    function Tile() {
        this.tileClick = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* EventEmitter */]();
    }
    Tile.prototype.getColor = function () {
        if (this.state == 0) {
            return "grey";
        }
        if (this.state == 1) {
            return "orange";
        }
        if (this.state == 2) {
            return "green";
        }
        if (this.state == 3) {
            return "red";
        }
    };
    Tile.prototype.tileClicked = function () {
        this.tileClick.emit(this);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Input */])(), 
        __metadata('design:type', String)
    ], Tile.prototype, "id", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Input */])(), 
        __metadata('design:type', Number)
    ], Tile.prototype, "state", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Output */])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* EventEmitter */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* EventEmitter */]) === 'function' && _a) || Object)
    ], Tile.prototype, "tileClick", void 0);
    Tile = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Component */])({
            selector: 'tile',
            template: "<div [ngClass]=\"['singleTile' , getColor()]\" (click)=\"tileClicked()\"></div>",
            styles: ["\n\n  .singleTile\n  {\n      height:100%;\n      transition:background-color 1s;\n  }\n\n  .grey\n  {\n      background-color:grey;\n  }\n    .red\n  {\n      background-color:red;\n  }\n    .green\n  {\n      background-color:green;    \n  }\n    .orange\n  {\n      background-color:orange;\n  }\n\n  "]
        }), 
        __metadata('design:paramtypes', [])
    ], Tile);
    return Tile;
    var _a;
}());
//# sourceMappingURL=/Users/admin/Documents/Aptana Studio 3 Workspace/my_pathFindr/src/tile.component.js.map

/***/ }),

/***/ 643:
/***/ (function(module, exports) {

module.exports = ".box{\n    width:80%;\n    height:100%;\n    margin-left:15%;\n    margin-top:20pt;\n    white-space: nowrap;\n  }\n\n  .cell{\n  display:inline-block;\n  border-style:groove;\n  height:100%;\n}\n\n.level\n{\n  float:left;\n  width:110px;\n}\n\n.next\n{\n  width:100%;\n  display:inline-block;\n  text-align:center;\n}\n\n.left-box\n{\n  float:left\n}\n\n.left-box-2\n{\n  float:left;\n  padding-left:20pt;\n}\n\n.button {\n    color: black;\n    font-family: Helvetica, sans-serif;\n    font-size:100%;\n    background: #e7e7e7;\n    border: 1px solid;\n    box-shadow: inset 0 0 0 1px #cdeffb;\n    padding:4px;\n    -webkit-transition:all 0.4s;\n    transition:all 0.4s;\n}\n\n.button:disabled\n{\n    background: #aaaaaa;\n    color:#779\n}\n\n.button:hover\n{\n  color: #fff;\n  background: #555555;\n}\n\n.start\n{\n  margin-top:10px;\n  text-align:center;\n}\n\n.overlay\n{\n  position:absolute;\n  top:89px;\n  left:0;\n  width:100%;\n  height:150%;\n  background-color:#adafce;\n}\n\n.dialog\n{\n  border-radius:25px;\n  text-align:center;\n  position:absolute;\n  top:120px;;\n  left:30%;\n  border:1px solid;\n  background-color:#e4e4e4;\n  width:350px;\n  height:200px;\n  z-index:1;\n  \n}\n\n.overlay, .dialog\n{\n  opacity: 0;\n  visibility: hidden;\n  -webkit-transition:all 0.6s;\n  transition: all 0.6s;\n}\n\n.overlay.active\n{\n  opacity: 0.8;\n  visibility: visible;\n}\n\n.dialog.active\n{\n  opacity: 1;\n  visibility: visible;\n}\n\n"

/***/ }),

/***/ 644:
/***/ (function(module, exports) {

module.exports = "   \n  <div *ngIf=\"activeGame.state == 'init'\" class=\"start\">\n  <button (click)=\"startNewGame() \" class=\"button\">hit me to start!</button>\n  </div>\n\n   <div class=\"level\" *ngIf=\"activeGame.state != 'init'\">Your on level {{activeGame.level}}</div>\n\n   <div *ngIf=\"activeGame.state == 'rFinished'\" class=\"next\">\n    <button class=\"button\" (click)=\"continueGame()\">wuhuu go on with level {{activeGame.level+1}}</button>\n   </div>\n  \n  <div class=\"box\" *ngIf=\"activeGame.state == 'runningShow' || activeGame.state == 'runningUser'|| activeGame.state == 'gameFinished'\">\n  <div [style.height.%]=\"tileSize\" *ngFor=\"let row of rows\">\n    <tile [state]=\"tile.state\" [id]=tile.id class=\"cell\" [style.width.%]=\"tileSize\" (tileClick)=\"tileClicked($event)\" *ngFor=\"let tile of row.tiles\">\n    </tile>\n  </div>\n  <div [style.margin-top.pt]=\"'15'\" *ngIf=\"activeGame.state == 'runningUser'\">uhhh thats too hard. <button [disabled]=\"solving\" class=\"button\" (click)=\"solve()\">Win the game for me</button></div>\n  </div>\n\n\n  <div [ngClass]=\"{'overlay':true,'active':activeGame.state == 'gameFinished' }\"></div>\n\n  <div [ngClass]=\"{'dialog':true,'active':activeGame.state == 'gameFinished' }\">\n   <p>OH NO that was wrong.</p>\n    <div>You reached level: {{activeGame.level}} with {{activeGame.result}}% correct Tiles</div>\n    <div>Save your highscrore for eternity: <input [(ngModel)]=\"playerName\" placeholder=\"{{placeholder}}\"/></div>\n    <button class=\"button\" (click)=\"save()\">save</button>\n    or <button class=\"button\" (click)=\"startNewGame()\" >try again :) </button><br/>\n  </div>"

/***/ }),

/***/ 662:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(370);


/***/ })

},[662]);
//# sourceMappingURL=main.bundle.map