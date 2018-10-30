//
// ─── GAME CONTROLLER ────────────────────────────────────────────────────────────
//


//
// ─── PREPARATIONS ───────────────────────────────────────────────────────────────
//
const cvs = document.getElementById('game-canvas');
const ctx = cvs.getContext('2d');

console.log("Loading images...")

let items = ['images/apple.png',
             'images/watermelon.png',
             'images/orange.png',
             'images/strawberry.png'];

loader(items, loadImage, function () {
    console.log("All images loaded...");
});

const imageApple = new Image(); imageApple.src = "images/apple.png";
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
$(".start-game-button").click(function() {
    d = "RIGHT";
    try {
        clearInterval(refreshMap);
        clearInterval(moveSnake);
    } catch(err) {
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

    refreshMap = setInterval(function() {
        map.generateFields();
        map.generateBarriers();
        snake.draw();
        apple.draw();
    }, 50);

    let count = 3;
    $("#game-info h1").css("display", "block");
    $("#game-info h1").html(count);
    let counter = setInterval(function() {
        count--;
        $("#game-info h1").html(count);
        if(count == 0) {
            $("#game-info h1").css("display", "none");
            clearInterval(counter);
        }
    }, 1000);

    setTimeout(function () {
        moveSnake = setInterval(function() {
            locked = false;
            snake.move();
            //check if food eaten
            if(apple.eat()) {
                gameStatistics.score += 5;
                $("#points").attr("value", "Points: " + gameStatistics.score);
            } else {
                snake.body.pop();
            }
            if(collisionWithBarriers(snake, map) || collisionWithSnake(snake) || collisionWithBorder(snake, map.mapSize)) {
                clearInterval(refreshMap);
                clearInterval(moveSnake);
                $("#game-finish").css("display", "block");
                checkIfTop(map.getName(), gameStatistics.score);
            }
        }, 10*(110-map.speed));
    }, 3000);

});
