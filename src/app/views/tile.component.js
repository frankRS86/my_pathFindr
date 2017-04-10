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
var TileModel = (function () {
    function TileModel() {
    }
    return TileModel;
}());
exports.TileModel = TileModel;
var Tile = (function () {
    function Tile() {
        this.tileClick = new core_1.EventEmitter();
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
    return Tile;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Tile.prototype, "id", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], Tile.prototype, "state", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], Tile.prototype, "tileClick", void 0);
Tile = __decorate([
    core_1.Component({
        selector: 'tile',
        template: "<div class=\"singleTile\" [style.background]=\"getColor()\" (click)=\"tileClicked()\">{{state}}</div>",
        styles: ["\n\n  .singleTile\n  {\n      height:100%;\n  }\n  "]
    })
], Tile);
exports.Tile = Tile;
//# sourceMappingURL=tile.component.js.map