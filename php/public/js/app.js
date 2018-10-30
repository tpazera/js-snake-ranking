class AppleFood {

    constructor(map, snake) {
        this.map = map;
        this.barriers = map.barriersArray;
        this.snake = snake;
    }

    findLocation() {
        this.x = Math.floor(Math.random() * this.map.mapSize);
        this.y = Math.floor(Math.random() * this.map.mapSize);
        for (let i = 0; i < this.barriers.length; i++) {
            if (this.x == this.barriers[i].x && this.y == this.barriers[i].y) {
                return false;
            }
        }
        for (let i = 0; i < this.snake.body.length; i++) {
            if (this.x == this.snake.body[i].x && this.y == this.snake.body[i].y) return false;
        }
        return true;
    }

    create() {
        let boolFindLocation = this.findLocation();
        while (true) {
            if (boolFindLocation) break;else boolFindLocation = this.findLocation();
        }
    }

    draw() {
        ctx.drawImage(imageApple, this.x * this.map.fieldSize, this.y * this.map.fieldSize, this.map.fieldSize, this.map.fieldSize);
    }

    eat() {
        if (this.x == this.snake.body[0].x && this.y == this.snake.body[0].y) {
            this.create();
            return true;
        }
        return false;
    }

}
class Board {

    constructor(name, mapSize, speed, barriers) {
        this.name = name;
        this.mapSize = mapSize;
        this.speed = speed;
        this.barriers = barriers;
        this.barriersArray = [];
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

    generateFields() {
        this.fieldSize = $("#game-canvas").attr("height") / this.mapSize;
        for (let i = 0; i < this.mapSize; i++) for (let j = 0; j < this.mapSize; j++) {
            if (i % 2 == j % 2) ctx.fillStyle = "#c9edb1";else ctx.fillStyle = "#91dd5f";
            ctx.fillRect(i * this.fieldSize, j * this.fieldSize, this.fieldSize, this.fieldSize);
        }
    }

    generateBarriers() {
        let barriersArray = [];
        ctx.fillStyle = "black";
        let x = 0;
        for (let i = 0; i < this.mapSize; i++) for (let j = 0; j < this.mapSize; j++) {
            if (this.barriers[i * this.mapSize + j] == '1') {
                if (x % 2) ctx.fillStyle = "#1a273d";else ctx.fillStyle = "#161c26";
                barriersArray[x++] = {
                    x: i,
                    y: j
                };
                ctx.fillRect(i * this.fieldSize, j * this.fieldSize, this.fieldSize, this.fieldSize);
            }
        }

        this.barriersArray = barriersArray;
    }
}
class BoardList {

    constructor() {
        this.boardList = new Map();
        this.boardList.set("Easy", new Board("Easy", 10, 70, ""));
        this.boardList.set("Medium", new Board("Medium", 15, 90, ""));
        this.boardList.set("Hard", new Board("Hard", 10, 90, "0000000000011100111001000000100100000010000000000000000000000100000010010000001001110011100000000000"));
    }

    getBoardList() {
        return this.boardList;
    }

    getSpecifiedMap(map_name) {
        return this.boardList.get(map_name);
    }

}
class GameStatistics {

    constructor() {
        this.score = 0;
        this.time = 0;
    }

}
class Ranking {

    constructor() {}

    showRanking(mapName) {
        $.ajax({
            type: "GET",
            url: "get-ranking.php",
            data: {
                'mapName': "'" + mapName + "'"
            },
            contentType: "application/json; charset=utf-8",
            dataType: 'json',

            success: function (json) {

                console.log(json);

                let i = 0;
                let html = "";
                for (let key in json) {
                    let row = json[key];
                    let userName = row[0];
                    let points = row[1];
                    html += "<li>" + ++i + ". " + userName + " - " + points + "</li>";
                }

                $('#ranking-table h4').html("Ranking for map: " + mapName);
                $('#ranking-table ul').html(html);
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
            url: "/get-worst-position.php",
            data: {
                'map': "'" + mapName + "'"
            }
        });
    }

    getNumberOfPositions(mapName) {
        return $.ajax({
            type: "GET",
            url: "/get-number-positions.php",
            data: {
                'map': "'" + mapName + "'"
            }
        });
    }

    addToRanking(mapName, userName, points) {
        $.ajax({
            type: "POST",
            url: "add-to-ranking.php",
            data: {
                'map': "'" + mapName + "'",
                'user': "'" + userName + "'",
                'points': points

            },

            success: function () {
                console.log("Added to ranking!");
            },

            error: function (error) {
                alert("Error on adding to the ranking!");
                console.log(error);
            }
        });
    }

}
class Snake {

    constructor(map) {
        this.map = map;
        this.body = [];
        this.body[0] = { x: 3, y: 3 };
        this.body[1] = { x: 2, y: 3 };
    }

    draw() {
        for (let i = 0; i < this.body.length; i++) {
            ctx.fillStyle = i == 0 ? "red" : "orange";
            ctx.fillRect(this.body[i].x * this.map.fieldSize, this.body[i].y * this.map.fieldSize, this.map.fieldSize, this.map.fieldSize);
        }
    }

    move() {
        let snakeX = this.body[0].x;
        let snakeY = this.body[0].y;

        if (d == "LEFT") snakeX -= 1;
        if (d == "RIGHT") snakeX += 1;
        if (d == "UP") snakeY -= 1;
        if (d == "DOWN") snakeY += 1;

        let newHead = {
            x: snakeX,
            y: snakeY
        };

        this.body.unshift(newHead);
    }

}

function collisionWithBarriers(snake, map) {
    for (let i = 0; i < map.barriersArray.length; i++) {
        if (map.barriersArray[i].x == snake.body[0].x && snake.body[0].y == map.barriersArray[i].y) {
            return true;
        }
    }
    return false;
}

function collisionWithSnake(snake) {
    for (let i = 1; i < snake.body.length; i++) {
        if (snake.body[0].x == snake.body[i].x && snake.body[0].y == snake.body[i].y) {
            return true;
        }
    }
    return false;
}

function collisionWithBorder(snake, mapSize) {
    if (snake.body[0].x == -1 || snake.body[0].x == mapSize || snake.body[0].y == -1 || snake.body[0].y == mapSize) {
        console.log(snake.body[0].x + " " + snake.body[0].y + " " + mapSize);
        return true;
    }
    return false;
}
//
// ─── GAME CONTROLLER ────────────────────────────────────────────────────────────
//


//
// ─── PREPARATIONS ───────────────────────────────────────────────────────────────
//
const cvs = document.getElementById('game-canvas');
const ctx = cvs.getContext('2d');

console.log("Loading images...");

let items = ['images/apple.png', 'images/watermelon.png', 'images/orange.png', 'images/strawberry.png'];

loader(items, loadImage, function () {
    console.log("All images loaded...");
});

const imageApple = new Image();imageApple.src = "images/apple.png";
// const imageWatermelon = new Image(); imageWatermelon.src = "images/watermelon.png";
// const imageOrange = new Image(); imageOrange.src = "images/orange.png";
// const imageStrawberry = new Image(); imageStrawberry.src = "images/strawberry.png";

//Generate basic board
simpleBoard = new Board("Simple", 50, 1, "");
simpleBoard.generateFields();
//Get list of map
mapList = new BoardList();

let refreshMap;
let moveSnake;

//Start button
$(".start-game-button").click(function () {
    d = "RIGHT";
    try {
        clearInterval(refreshMap);
        clearInterval(moveSnake);
    } catch (err) {
        console.log(err);
    }
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    let map_name = $(".game-map-select").val();
    let map = mapList.getSpecifiedMap(map_name);
    map.generateFields();
    map.generateBarriers();
    let snake = new Snake(map);
    let apple = new AppleFood(map, snake);
    let gameStatistics = new GameStatistics();

    $("#points").attr("value", "Points: " + gameStatistics.score);

    apple.create();

    refreshMap = setInterval(function () {
        map.generateFields();
        map.generateBarriers();
        snake.draw();
        apple.draw();
    }, 50);

    let count = 3;
    $("#game-info h1").css("display", "block");
    $("#game-info h1").html(count);
    let counter = setInterval(function () {
        count--;
        $("#game-info h1").html(count);
        if (count == 0) {
            $("#game-info h1").css("display", "none");
            clearInterval(counter);
        }
    }, 1000);

    setTimeout(function () {
        moveSnake = setInterval(function () {
            locked = false;
            snake.move();
            //check if food eaten
            if (apple.eat()) {
                gameStatistics.score += 5;
                $("#points").attr("value", "Points: " + gameStatistics.score);
            } else {
                snake.body.pop();
            }
            if (collisionWithBarriers(snake, map) || collisionWithSnake(snake) || collisionWithBorder(snake, map.mapSize)) {
                clearInterval(refreshMap);
                clearInterval(moveSnake);
                $("#game-finish").css("display", "block");
                checkIfTop(map.getName(), gameStatistics.score);
            }
        }, 10 * (110 - map.speed));
    }, 3000);
});
function loader(items, loadFunction, allDone) {
    if (!items) {
        return;
    }

    //convert single item to array
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

function loadImage(items, i, onComplete) {
    var onLoad = function (e) {
        e.target.removeEventListener("load", onLoad);
        onComplete(items, i);
    };
    var img = new Image();
    img.addEventListener("load", onLoad, false);
    img.src = items[i];
}
document.addEventListener("keydown", direction);

let d = "RIGHT";
let locked = false;

function direction(event) {
    if (!locked) {
        if (event.keyCode == 37 && d != "RIGHT") d = "LEFT";
        if (event.keyCode == 38 && d != "DOWN") d = "UP";
        if (event.keyCode == 39 && d != "LEFT") d = "RIGHT";
        if (event.keyCode == 40 && d != "UP") d = "DOWN";
        locked = true;
    }
}
function checkIfTop(mapName, points) {
    let ranking = new Ranking(mapName);

    try {
        $("#inputName, #submitButton").remove();
    } catch (err) {
        console.log(err);
    }

    var request = ranking.getNumberOfPositions(mapName);
    request.done(function (numberOfPositions) {
        if (numberOfPositions[0][0] < 10) {
            inTop(points);
        } else {
            var request2 = ranking.getWorstPosition(mapName);
            request2.done(function (worstPosition) {
                if (worstPosition[0][0] < points) {
                    inTop(points);
                } else {
                    notInTop(points);
                }
            });
        }
    });
}

function inTop(points) {
    $(".modal-body .scored-points").html("Scored points: " + points);
    $(".ranking-info").html("Your place in the ranking: 5!<br>Enter your nickname:");
    $(".ranking-info").after('<input type="text" class="form-control" id="inputName" placeholder="Tomek">');
    $(".modal-footer").prepend('<button type="button" id="submitButton" class="btn btn-primary">Send</button>');
}

function notInTop(points) {
    $(".modal-body .scored-points").html("Scored points: " + points);
    $(".ranking-info").html("Unfortunately you did not qualify for the ranking.");
}
//
// ─── CONTROLLER FOR BUTTONS GENERATING WINDOWS ─────────────────────────────────────────────────────
//

$(document).ready(function () {
    //show first panel - game panel
    $(".game-panel").css("display", "block");
    $(".game-left-panel").css("display", "block");
    //bool for animation
    var animation_end = true;
    //"GAME" Button
    $(".buttons-panel .start-button, .buttons-panel .map-button, .buttons-panel .ranking-button").click(function () {
        if (animation_end) {
            animation_end = false;
            var active_button = $(this);
            $(".right-panel, .left-panel").animate({
                opacity: 0
            }, 500, function () {});
            setTimeout(function () {
                $(".right-panel, .left-panel").css("display", "none");
                var btn_name = "start-button";
                if ($(active_button).hasClass("start-button")) btn_name = ".game-panel, .game-left-panel";else btn_name = ".ranking-panel, .ranking-left-panel";
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
});
$(document).ready(function () {

    let ranking = new Ranking();
    ranking.showRanking('Easy');
    checkIfTop('Easy', 500);
});