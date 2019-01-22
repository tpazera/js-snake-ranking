class Coordinates {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    setX(x) {
        this.x = x;
    }

    setY(y) {
        this.y = y;
    }
}
class Barrier extends Coordinates {
    constructor(color, x, y) {
        super(x, y);
        this.color = color;
    }

    getColor() {
        return this.color;
    }

    setColor(color) {
        this.color = color;
    }
}
class BarriersArray {
    constructor(barriersString, mapSize) {
        this.barriers = [];
        this.setBarriersFromString(barriersString, mapSize);
    }

    getBarriersArray() {
        return this.barriers;
    }

    setBarriersArray(barriers) {
        this.barriers = barriers;
    }

    setBarriersFromString(barriersString, mapSize) {
        this.barriers = [];
        let x = 0,
            color;
        for (let i = 0; i < mapSize; i++) {
            for (let j = 0; j < mapSize; j++) {
                if (barriersString[i * mapSize + j] == '1') {
                    if (x % 2) color = "#1a273d";else color = "#161c26";
                    this.barriers.push(new Barrier(color, i, j));
                    x++;
                }
            }
        }
    }
}
class Board {

    constructor(name, mapSize, speed, barriers) {
        this.name = name;
        this.mapSize = mapSize;
        this.speed = speed;
        this.barriers = barriers;
        this.fieldSize = $("#game-canvas").attr("height") / this.mapSize;
    }

    getName() {
        return this.name;
    }
    getMapSize() {
        return this.mapSize;
    }
    getSpeed() {
        return this.speed;
    }
    getBarriers() {
        return this.barriers;
    }

    setName(name) {
        this.name = name;
    }
    setMapSize(mapSize) {
        this.mapSize = mapSize;
    }
    setSpeed(speed) {
        this.speed = speed;
    }
    setBarriers(barriers) {
        this.barriers = barriers;
    }

    getAttributes() {
        let mapAttributes = new Map();
        mapAttributes.set("name", this.name);
        mapAttributes.set("mapSize", this.mapSize);
        mapAttributes.set("speed", this.speed);
        mapAttributes.set("barriers", this.barriers);
        return mapAttributes;
    }

    generateFields(ctx) {
        let fieldSize = $("#game-canvas").attr("height") / this.mapSize;
        for (let i = 0; i < this.mapSize; i++) {
            for (let j = 0; j < this.mapSize; j++) {
                if (i % 2 == j % 2) ctx.fillStyle = "#c9edb1";else ctx.fillStyle = "#91dd5f";
                ctx.fillRect(i * fieldSize, j * fieldSize, fieldSize, fieldSize);
            }
        }
    }

    generateBarriers(ctx) {
        let fieldSize = $("#game-canvas").attr("height") / this.mapSize;
        let barriersArray = this.barriers.getBarriersArray();
        for (let i = 0; i < barriersArray.length; i++) {
            ctx.fillStyle = barriersArray[i].getColor();
            ctx.fillRect(barriersArray[i].getX() * fieldSize, barriersArray[i].getY() * fieldSize, fieldSize, fieldSize);
        }
    }
}
class BoardList {

    constructor() {
        this.boardList = new Map();
        this.boardList.set("Easy", new Board("Easy", 10, 70, new BarriersArray("", 10)));
        this.boardList.set("Medium", new Board("Medium", 15, 90, new BarriersArray("", 15)));
        this.boardList.set("Hard", new Board("Hard", 10, 90, new BarriersArray("0000000000011100111001000000100100000010000000000000000000000100000010010000001001110011100000000000", 10)));
    }

    getBoardList() {
        return this.boardList;
    }

    getSpecifiedMap(map_name) {
        return this.boardList.get(map_name);
    }

}
class AppleFood extends Coordinates {

    constructor() {
        super(0, 0);
        this.imageApple = new Image();
        this.imageApple.src = "images/apple.png";
    }

    findLocation(map, snake) {
        this.setX(Math.floor(Math.random() * map.mapSize));
        this.setY(Math.floor(Math.random() * map.mapSize));
        let barriersArray = map.getBarriers().getBarriersArray();
        for (let i = 0; i < barriersArray.length; i++) {
            if (this.getX() == barriersArray[i].getX() && this.getY() == barriersArray[i].getY()) {
                return false;
            }
        }
        for (let i = 0; i < snake.body.length; i++) {
            if (this.getX() == snake.body[i].x && this.getY() == snake.body[i].y) return false;
        }
        return true;
    }

    create(map, snake) {
        let boolFindLocation = this.findLocation(map, snake);
        while (true) {
            if (boolFindLocation) break;else boolFindLocation = this.findLocation(map, snake);
        }
    }

    draw(map, ctx) {
        ctx.drawImage(this.imageApple, this.getX() * map.fieldSize, this.getY() * map.fieldSize, map.fieldSize, map.fieldSize);
    }

    eat(map, snake) {
        if (this.getX() == snake.body[0].x && this.getY() == snake.body[0].y) {
            this.create(map, snake);
            return true;
        }
        return false;
    }

}
class GameStatistics {

    constructor() {
        this.score = 0;
    }

    getScore() {
        return this.score;
    }

    increaseScore() {
        this.score += 5;
    }

}
class Ranking {

    constructor() {}

    showRanking(mapName) {
        $.ajax({
            type: "GET",
            url: "/queries/get-ranking.php",
            data: {
                'mapName': "'" + mapName + "'"
            },
            contentType: "application/json; charset=utf-8",
            dataType: 'json',

            success: function (json) {

                let i = 0;
                let html = "";
                for (let key in json) {
                    let row = json[key];
                    let userName = row[0];
                    let points = row[1];
                    html += '<tr><th scope="row">' + ++i + '</th><td>' + userName + '</td><td>' + points + '</td></tr>';
                }

                $('#ranking-table h4').html("Ranking for map: " + mapName);
                $('#ranking-table .table tbody').html(html);
            },

            error: function (error) {
                alert("Error on getting data!");
                console.log(error);
            }

        });
    }

    getWorstPosition(mapName) {
        return $.ajax({
            type: "GET",
            url: "/queries/get-worst-position.php",
            data: {
                'map': "'" + mapName + "'"
            }
        });
    }

    getNumberOfPositions(mapName) {
        return $.ajax({
            type: "GET",
            url: "/queries/get-number-positions.php",
            data: {
                'map': "'" + mapName + "'"
            }
        });
    }

    getPlace(mapName, points) {
        return $.ajax({
            type: "GET",
            url: "/queries/get-place.php",
            data: {
                'map': "'" + mapName + "'",
                'points': points
            }
        });
    }

    addToRanking(mapName, userName, points) {
        return $.ajax({
            type: "POST",
            url: "/queries/add-to-ranking.php",
            data: {
                'map': "'" + mapName + "'",
                'user': "'" + userName + "'",
                'points': points
            }
        });
    }

    updateRanking(mapName, userName, points) {
        return $.ajax({
            type: "POST",
            url: "/queries/update-ranking.php",
            data: {
                'map': "'" + mapName + "'",
                'user': "'" + userName + "'",
                'points': points
            }
        });
    }

}
class Snake {

    constructor() {
        this.body = [];
        this.body[0] = new Coordinates(3, 3);
        this.body[1] = new Coordinates(2, 3);
    }

    draw(map, ctx) {
        for (let i = 0; i < this.body.length; i++) {
            ctx.fillStyle = i == 0 ? "red" : "orange";
            ctx.fillRect(this.body[i].getX() * map.fieldSize, this.body[i].getY() * map.fieldSize, map.fieldSize, map.fieldSize);
        }
    }

    move(direction) {
        let snakeX = this.body[0].getX();
        let snakeY = this.body[0].getY();

        if (direction == "LEFT") snakeX -= 1;
        if (direction == "RIGHT") snakeX += 1;
        if (direction == "UP") snakeY -= 1;
        if (direction == "DOWN") snakeY += 1;

        let newHead = new Coordinates(snakeX, snakeY);

        this.body.unshift(newHead);
    }

    getBody() {
        return this.body;
    }

    setBody(body) {
        this.body = body;
    }

}

class CollisionsChecker {

    constructor() {}

    collisionWithBarriers(snake, map) {
        let barriersArray = map.getBarriers().getBarriersArray();
        for (let i = 0; i < barriersArray.length; i++) {
            if (barriersArray[i].getX() == snake.body[0].getX() && snake.body[0].getY() == barriersArray[i].getY()) {
                return true;
            }
        }
        return false;
    }

    collisionWithSnake(snake) {
        for (let i = 1; i < snake.body.length; i++) {
            if (snake.body[0].getX() == snake.body[i].getX() && snake.body[0].getY() == snake.body[i].getY()) {
                return true;
            }
        }
        return false;
    }

    collisionWithBorder(snake, mapSize) {
        if (snake.body[0].getX() == -1 || snake.body[0].getX() == mapSize || snake.body[0].getY() == -1 || snake.body[0].getY() == mapSize) {
            return true;
        }
        return false;
    }

}
//
// ─── GAME CONTROLLER ────────────────────────────────────────────────────────────
//
class GameController {

    constructor() {
        //Get canvas context
        let cvs = document.getElementById('game-canvas');
        this.ctx = cvs.getContext('2d');

        //Generate default map
        let mapList = new BoardList();
        this.map = this.generateMap(mapList, "Hard");

        this.apple = new AppleFood();
        this.snake = new Snake();
        this.snake.draw(this.map, this.ctx);
        this.apple.draw(this.map, this.ctx);
        this.gameStatistics = new GameStatistics();

        //Create default ranking
        let rc = new RankingController();
        rc.showRanking('Easy');

        //Load images
        let imagesLoader = new ImagesLoader();
        let items = ['images/apple.png'];
        imagesLoader.loader(items, imagesLoader.loadImage, function () {
            console.log("All images loaded...");
        });

        //Start button listener
        this.game();
    }

    game() {
        let collisionsChecker = new CollisionsChecker();
        //Intervals and timeouts
        let refreshMap;
        let moveSnake;
        let counter;
        let game;

        let gc = this;

        //Start button
        $(".start-game-button").click(function () {
            try {
                //Clear all intervals and timeouts every button click
                gc.removeModal();
                clearInterval(refreshMap);
                clearInterval(moveSnake);
                clearTimeout(counter);
                clearTimeout(game);
            } catch (err) {
                console.log(err);
            }
            //Clear old map and generate 
            gc.getContext().clearRect(0, 0, document.getElementById('game-canvas').width, document.getElementById('game-canvas').height);

            //New settings based on input
            let mapName = $(".game-map-select").val();

            gc.map = gc.generateMap(new BoardList(), mapName);
            gc.snake = new Snake();
            gc.apple = new AppleFood();
            gc.gameStatistics = new GameStatistics();

            $("#points").attr("value", "Points: " + gc.gameStatistics.getScore());
            gc.apple.create(gc.map, gc.snake);

            refreshMap = setInterval(function () {
                gc.map.generateFields(gc.ctx);
                gc.map.generateBarriers(gc.ctx);
                gc.snake.draw(gc.map, gc.getContext());
                gc.apple.draw(gc.map, gc.getContext());
            }, 50);

            //COUNTER
            let count = 3;
            $("#game-info h1").css("display", "block");
            $("#game-info h1").html(count);
            counter = setInterval(function () {
                count--;
                $("#game-info h1").html(count);
                if (count == 0) {
                    $("#game-info h1").css("display", "none");
                    clearInterval(counter);
                }
            }, 1000);

            //GAME LISTENER, AFTER 3 SECONDS START MOVING SNAKE
            game = setTimeout(function () {
                kc.setDirection("RIGHT");
                moveSnake = setInterval(function () {
                    kc.locked = false;
                    gc.snake.move(kc.getDirection());
                    //check if food eaten
                    if (gc.apple.eat(gc.map, gc.snake)) {
                        gc.gameStatistics.increaseScore();
                        $("#points").attr("value", "Points: " + gc.gameStatistics.getScore());
                    } else {
                        gc.snake.body.pop();
                    }
                    if (collisionsChecker.collisionWithBarriers(gc.snake, gc.map) || collisionsChecker.collisionWithSnake(gc.snake) || collisionsChecker.collisionWithBorder(gc.snake, gc.map.mapSize)) {
                        clearInterval(refreshMap);
                        clearInterval(moveSnake);
                        clearTimeout(counter);
                        clearTimeout(game);
                        console.log("Game finished!");
                        $("#game-finish").css("display", "block");
                        let rc = new RankingController();
                        rc.checkIfTop(gc.map.getName(), gc.gameStatistics.getScore());
                    }
                }, 10 * (110 - gc.map.speed));
            }, 3000);
        });
    }

    generateMap(mapList, mapName) {
        let map = mapList.getSpecifiedMap(mapName);
        map.generateFields(this.ctx);
        map.generateBarriers(this.ctx);
        return map;
    }

    removeModal() {
        $(".modal").remove();
    }

    getContext() {
        return this.ctx;
    }

    setContext(ctx) {
        this.ctx = ctx;
    }

}
class ImagesLoader {

    constructor() {}

    loader(items, loadFunction, allDone) {
        if (!items) {
            return;
        }

        if ("undefined" === items.length) {
            items = [items];
        }

        var count = items.length;

        var checkIfAllLoaded = function (items, i) {
            count--;
            if (0 == count) {
                allDone(items);
            }
        };

        for (var i = 0; i < items.length; i++) {
            loadFunction(items, i, checkIfAllLoaded);
        }
    }

    loadImage(items, i, onComplete) {
        var onLoad = function (e) {
            e.target.removeEventListener("load", onLoad);
            onComplete(items, i);
        };
        var img = new Image();
        img.addEventListener("load", onLoad, false);
        img.src = items[i];
    }

}
//STOP MOVING PAGE
window.addEventListener("keydown", function (e) {
    // space and arrow keys
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

document.addEventListener("keydown", directionChange);

function directionChange(event) {
    if (kc.locked == "undefined" || kc.locked == null || kc.locked == undefined) kc.locked = false;
    if (!kc.locked) {
        if (event.keyCode == 37 && kc.direction != "RIGHT") kc.direction = "LEFT";
        if (event.keyCode == 38 && kc.direction != "DOWN") kc.direction = "UP";
        if (event.keyCode == 39 && kc.direction != "LEFT") kc.direction = "RIGHT";
        if (event.keyCode == 40 && kc.direction != "UP") kc.direction = "DOWN";
        kc.locked = true;
    }
}

class KeyController {

    constructor() {
        this.direction = "RIGHT";
        this.locked = false;
    }

    getDirection() {
        return this.direction;
    }

    setDirection(direction) {
        this.direction = direction;
    }
}
class RankingController {

    constructor() {
        this.ranking = new Ranking();
        this.showRankingButton();
    }

    inTop(points, place, mapName, queryType) {
        let rc = this;
        $("#game-finish .content").html('<div class="modal" tabindex="-1" role="dialog"> <div class="modal-dialog" role="document"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title">GAME OVER</h5> </div><div class="modal-body"> <h5 class="scored-points">Scored points: ' + points + '</h5> <h5>Ranking:</h5> <p class="ranking-info"> Your place in the ranking: ' + place + '!<br>Enter your nickname: <p></p><input type="text" maxlength="10" class="form-control" id="inputName" placeholder="Tomek"> </p></div><div class="modal-footer"> <button type="button" id="submitButton" class="btn btn-primary">Send</button> <button type="button" onclick="removeModal()" id="close-modal" class="btn btn-success" data-dismiss="modal">Close</button> </div></div></div></div>');
        $("#submitButton").click(function () {
            if ($("#inputName").val() == "" || $("#inputName").val() == null) {
                try {
                    $(".error-nickname").remove();
                } catch (err) {}
                $(".ranking-info").append('<p></p><div class="error-nickname alert alert-danger" role="alert">Input your nickname!</div>');
            } else if (!rc.isValid($("#inputName").val())) {
                try {
                    $(".error-nickname").remove();
                } catch (err) {}
                $(".ranking-info").append('<p></p><div class="error-nickname alert alert-danger" role="alert">You can use only letters and numbers in your nickname!</div>');
            } else {
                let ranking = new Ranking();
                if (queryType == "insert") {
                    var request = ranking.addToRanking(mapName, $("#inputName").val(), points);
                    request.done(function (e) {
                        console.log("[INSERT] Added to ranking!");
                    });
                } else if (queryType == "update") {
                    var request = ranking.updateRanking(mapName, $("#inputName").val(), points);
                    request.done(function (e) {
                        console.log("[UPDATE] Added to ranking!");
                    });
                }

                gameController.removeModal();
            }
        });
    }

    showRanking(mapName) {
        this.ranking.showRanking(mapName);
    }

    notInTop(points) {
        $("#game-finish .content").html('<div class="modal" tabindex="-1" role="dialog"> <div class="modal-dialog" role="document"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title">GAME OVER</h5> </div><div class="modal-body"> <h5 class="scored-points">Scored points: ' + points + '</h5> <h5>Ranking:</h5> <p class="ranking-info"><i>Unfortunately you did not qualify for the ranking.</i></p></div><div class="modal-footer"> <button onclick="removeModal()" id="close-modal" type="button" class="btn btn-success" data-dismiss="modal">Close</button> </div></div></div></div>');
    }

    isValid(str) {
        return (/^\w+$/.test(str)
        );
    }

    //Show ranking button
    showRankingButton() {
        $(".show-ranking-button").click(function () {
            var ranking = new Ranking();
            ranking.showRanking($(".ranking-map-select").val());
        });
    }

    checkIfTop(mapName, points) {
        let ranking = new Ranking(mapName);
        let rc = this;
        try {
            $("#inputName, #submitButton").remove();
        } catch (err) {
            console.log(err);
        }

        var requestNumberOfPositions = ranking.getNumberOfPositions(mapName);
        requestNumberOfPositions.done(function (numberOfPositions) {
            if (numberOfPositions[0][0] < 10) {
                var requestGetPlace = ranking.getPlace(mapName, points);
                requestGetPlace.done(function (place) {
                    rc.inTop(points, parseInt(place) + 1, mapName, "insert");
                });
            } else {
                var requestGetWorstPosition = ranking.getWorstPosition(mapName);
                requestGetWorstPosition.done(function (worstPosition) {
                    if (worstPosition[0][0] < points) {
                        var requestGetPlace = ranking.getPlace(mapName, points);
                        requestGetPlace.done(function (place) {
                            rc.inTop(points, parseInt(place) + 1, mapName, "update");
                        });
                    } else {
                        rc.notInTop(points);
                    }
                });
            }
        });
    }
}
//
// ─── CONTROLLER FOR BUTTONS GENERATING WINDOWS ─────────────────────────────────────────────────────
//

let screen = "game";

class WindowsController {
    constructor() {
        this.addButtonsListener();
    }

    addButtonsListener() {
        $(".game-panel").css("display", "block");
        $(".game-left-panel").css("display", "block");
        //bool for animation
        let animation_end = true;
        //"GAME" Button
        $(".buttons-panel .start-button, .buttons-panel .ranking-button").click(function () {
            if (animation_end) {
                animation_end = false;
                let active_button = $(this);
                $(".right-panel, .left-panel").animate({
                    opacity: 0
                }, 500, function () {});
                setTimeout(function () {
                    $(".right-panel, .left-panel").css("display", "none");
                    let btn_name = "start-button";
                    if ($(active_button).hasClass("start-button")) btn_name = ".game-panel, .game-left-panel";else btn_name = ".ranking-panel, .ranking-left-panel";
                    if ($(active_button).hasClass("ranking-button")) {
                        let rc = new Ranking();
                        rc.showRanking($(".ranking-map-select").val());
                    }
                    $(btn_name).css("display", "block");
                    $(btn_name).animate({
                        opacity: 1
                    }, 500, function () {});
                }, 510);
                setTimeout(function () {
                    animation_end = true;
                }, 1020);
            }
        });
    }
}
let gameController;
let kc;
$(document).ready(function () {
    WindowsController = new WindowsController();
    gameController = new GameController();
    kc = new KeyController();
});