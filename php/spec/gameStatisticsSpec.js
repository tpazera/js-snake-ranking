var GameStatistics = require("../src/js/Models/GameStatistics.js");

describe('score at the beggining', function () {
    var gs = new GameStatistics();

    it("should be 0", function () {
        expect(gs.getScore()).toBe(0);
    });
})

describe('score after one increase', function () {
    var gs = new GameStatistics();
    gs.increaseScore();

    it("should be 5", function () {
        expect(gs.getScore()).toBe(5);
    });
})