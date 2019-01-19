var jsdom = require('jsdom');
const { JSDOM } = jsdom;

global.jQuery = global.$ = require("jquery")((new JSDOM('')).window);

var CollisionsChecker = require("./../src/js/Controllers/CollisionsChecker.js");
var Snake = require("./../src/js/Models/Snake.js");
var Coordinates = require("./../src/js/Models/Coordinates.js");
var Barrier = require("./../src/js/Models/Barrier.js");
var BarriersArray = require("./../src/js/Models/BarriersArray.js");
var Board = require("./../src/js/Models/Board.js");

describe('easy : on start snake collision', function () {

    var cc = new CollisionsChecker();
    var snake = new Snake();
    var map = new Board("Easy",10,70, new BarriersArray("", 10));

    it("with barriers should be false", function () {
        expect(cc.collisionWithBarriers(snake, map)).toBe(false);
    })

    it("with body should be false", function () {
        expect(cc.collisionWithBorder(snake, map.getMapSize())).toBe(false);
    })

    it("with border should be false", function () {
        expect(cc.collisionWithSnake(snake)).toBe(false);
    })
})

describe('medium : on start snake collision', function () {

    var cc = new CollisionsChecker();
    var snake = new Snake();
    var map = new Board("Medium",15,90, new BarriersArray("", 15));

    it("with barriers should be false", function () {
        expect(cc.collisionWithBarriers(snake, map)).toBe(false);
    })

    it("with body should be false", function () {
        expect(cc.collisionWithBorder(snake, map.getMapSize())).toBe(false);
    })

    it("with border should be false", function () {
        expect(cc.collisionWithSnake(snake)).toBe(false);
    })
})

describe('hard : on start snake collision', function () {

    var cc = new CollisionsChecker();
    var snake = new Snake();
    var map = new Board("Hard",10,90, new BarriersArray("0000000000011100111001000000100100000010000000000000000000000100000010010000001001110011100000000000", 10));

    it("with barriers should be false", function () {
        expect(cc.collisionWithBarriers(snake, map)).toBe(false);
    })

    it("with body should be false", function () {
        expect(cc.collisionWithBorder(snake, map.getMapSize())).toBe(false);
    })

    it("with border should be false", function () {
        expect(cc.collisionWithSnake(snake)).toBe(false);
    })
})

describe('if head of snake collide with his own body', function () {

    var cc = new CollisionsChecker();
    var snake = new Snake();
    var map = new Board("Easy",10,70, new BarriersArray("", 10));

    snake.setBody([new Coordinates(5, 5), new Coordinates(4,5), new Coordinates(5,5)]);

    it("collisionWithSnake should be true", function () {
        expect(cc.collisionWithSnake(snake)).toBe(true);
    })
})

describe('if head of snake collide with barrier', function () {

    var cc = new CollisionsChecker();
    var snake = new Snake();
    var map = new Board("Hard",10,90, new BarriersArray("0000000000011100111001000000100100000010000000000000000000000100000010010000001001110011100000000000", 10));
    snake.setBody([new Coordinates(1, 3), new Coordinates(2,3), new Coordinates(3,3)]);

    it("collisionWithBarriers should be true", function () {
        expect(cc.collisionWithBarriers(snake, map)).toBe(true);
    })
})
