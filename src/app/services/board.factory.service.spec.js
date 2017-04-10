"use strict";
var board_factory_service_1 = require("./board.factory.service");
describe("board.facory.service.test", function () {
    var testee;
    beforeEach(function () {
        testee = new board_factory_service_1.BoardFactory();
    });
    it('getBoard returns undefined with invalid size', function () {
        var rows = testee.getBoard(-1);
        expect(rows).toBeUndefined();
    });
    it('getBoard returns valid board with valid size', function () {
        var rows = testee.getBoard(4);
        expect(rows).toBeDefined();
        expect(rows.length).toBe(4, "rows have the wrong length");
        expect(rows[0].tiles).toBeDefined();
        expect(rows[0].tiles.length).toBe(4, "a single row has the wrong length");
    });
    it('getBoard returns valid board with a large size', function () {
        var rows = testee.getBoard(15);
        expect(rows).toBeDefined();
        expect(rows.length).toBe(15, "rows have the wrong length");
        expect(rows[14].tiles).toBeDefined();
        expect(rows[14].tiles.length).toBe(15, "a single row has the wrong length");
    });
    it('getBoard tiles have valid id', function () {
        var rows = testee.getBoard(4);
        expect(rows[0].tiles[0].id).toBe("0+0", "a single tile has the wrong id");
        expect(rows[3].tiles[3].id).toBe('3+3', "a single tile has the wrong id");
    });
    it('getBoard all tiles are initiated with 0', function () {
        var rows = testee.getBoard(4);
        expect(rows[0].tiles[0].state).toBe(0, "a single tile has the wrong state");
        expect(rows[3].tiles[3].state).toBe(0, "a single tile has the wrong state");
    });
    //create path tests
    it('createNewPath invalid board', function () {
        var path = testee.createNewPath(undefined);
        expect(path).toBeDefined();
        expect(path.length).toBe(0, "path should be 0");
    });
    it('createNewPath valid board min path lenth', function () {
        var path = testee.createNewPath(testee.getBoard(4));
        expect(path).toBeDefined();
        expect(path.length).toBeGreaterThan(3);
    });
});
//# sourceMappingURL=board.factory.service.spec.js.map