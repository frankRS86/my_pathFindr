"use strict";
var highscore_service_1 = require("./highscore.service");
var highscore_service_2 = require("./highscore.service");
describe("highscore.service.test", function () {
    var testee;
    var refEntry;
    beforeEach(function () {
        testee = new highscore_service_1.HighscoreService();
        var g = {
            state: "doesnt matter for test",
            level: 5,
            result: 50,
            rows: undefined
        };
        refEntry = new highscore_service_2.Entry("joan doe", g);
    });
    it('Entry equals invalid other', function () {
        var e = new highscore_service_2.Entry("joan", undefined);
        var result = e.equals(undefined);
        expect(result).toBe(-1);
    });
    it('Entry lesser level and percentage than other', function () {
        var e = new highscore_service_2.Entry("joan 2", { level: 6, result: 10, state: "", rows: undefined });
        var result = refEntry.equals(e);
        expect(result).toBe(1);
    });
    it('Entry lesser level but higher percentage than other', function () {
        var e = new highscore_service_2.Entry("joan 2", { level: 6, result: 100, state: "", rows: undefined });
        var result = refEntry.equals(e);
        expect(result).toBe(1);
    });
    it('Entry higher level and percentage than other', function () {
        var e = new highscore_service_2.Entry("joan 2", { level: 3, result: 10, state: "", rows: undefined });
        var result = refEntry.equals(e);
        expect(result).toBe(-1);
    });
    it('Entry higher level but lower percentage than other', function () {
        var e = new highscore_service_2.Entry("joan 2", { level: 3, result: 100, state: "", rows: undefined });
        var result = refEntry.equals(e);
        expect(result).toBe(-1);
    });
    it('Entry same level but lower percentage than other', function () {
        var e = new highscore_service_2.Entry("joan 2", { level: 5, result: 100, state: "", rows: undefined });
        var result = refEntry.equals(e);
        expect(result).toBe(1);
    });
    it('Entry same level but higher percentage than other', function () {
        var e = new highscore_service_2.Entry("joan 2", { level: 5, result: 10, state: "", rows: undefined });
        var result = refEntry.equals(e);
        expect(result).toBe(-1);
    });
    it('Entry same level and same percentage than other', function () {
        var e = new highscore_service_2.Entry("joan 2", { level: 5, result: 50, state: "", rows: undefined });
        var result = refEntry.equals(e);
        expect(result).toBe(0);
    });
    it('Highscore save undefined', function () {
        var result = testee.save(undefined, undefined);
        expect(result).toBe(false, "valid name should be neccessary");
    });
    it('Highscore save name with length 0', function () {
        var result = testee.save("", undefined);
        expect(result).toBe(false, "valid name should be neccessary");
    });
    it('Highscore save without result', function () {
        var result = testee.save("testname", undefined);
        expect(result).toBe(false, "valid name result is neccessary");
    });
    it('Highscore save with invalid result.level', function () {
        var result = testee.save("testname", { level: -1, result: 50, state: "", rows: undefined });
        expect(result).toBe(false, "valid result is neccessary");
    });
    it('Highscore save with invalid result.result', function () {
        var result = testee.save("testname", { level: 1, result: 110, state: "", rows: undefined });
        expect(result).toBe(false, "valid result is neccessary");
    });
    it('Highscore save with invalid result.result', function () {
        var result = testee.save("testname", { level: 1, result: -1, state: "", rows: undefined });
        expect(result).toBe(false, "valid result is neccessary");
    });
    it('Highscore save and emitted with valid data', function () {
        var result = testee.save("testname", { level: 1, result: 10, state: "", rows: undefined });
        testee.getCurrentHighscores().subscribe(function (e) {
            expect(e.length).toBe(1, "valid result is neccessary");
        });
        expect(result).toBe(true, "valid result is neccessary");
    });
});
//# sourceMappingURL=highscore.service.spec.js.map