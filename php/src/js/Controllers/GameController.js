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
        $(".start-game-button").click(function() {
            try {
                //Clear all intervals and timeouts every button click
                gc.removeModal();
                clearInterval(refreshMap);
                clearInterval(moveSnake);
                clearTimeout(counter);
                clearTimeout(game);
            } catch(err) {
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

            refreshMap = setInterval(function() {
                gc.map.generateFields(gc.ctx);
                gc.map.generateBarriers(gc.ctx);
                gc.snake.draw(gc.map, gc.getContext());
                gc.apple.draw(gc.map, gc.getContext());
            }, 50);

            //COUNTER
            let count = 3;
            $("#game-info h1").css("display", "block");
            $("#game-info h1").html(count);
            counter = setInterval(function() {
                count--;
                $("#game-info h1").html(count);
                if(count == 0) { 
                    $("#game-info h1").css("display", "none");
                    clearInterval(counter);
                } 
            }, 1000);


            //GAME LISTENER, AFTER 3 SECONDS START MOVING SNAKE
            game = setTimeout(function () {
                kc.setDirection("RIGHT");
                moveSnake = setInterval(function() {
                    kc.locked = false;
                    gc.snake.move(kc.getDirection());
                    //check if food eaten
                    if(gc.apple.eat(gc.map, gc.snake)) {
                        gc.gameStatistics.increaseScore();
                        $("#points").attr("value", "Points: " + gc.gameStatistics.getScore());
                    } else {
                        gc.snake.body.pop();
                    }
                    if(collisionsChecker.collisionWithBarriers(gc.snake, gc.map) || collisionsChecker.collisionWithSnake(gc.snake) || collisionsChecker.collisionWithBorder(gc.snake, gc.map.mapSize)) {
                        clearInterval(refreshMap);
                        clearInterval(moveSnake);
                        clearTimeout(counter);
                        clearTimeout(game);
                        console.log("Game finished!");
                        $("#game-finish").css("display", "block");
                        let rc = new RankingController();
                        rc.checkIfTop(gc.map.getName(), gc.gameStatistics.getScore());
                    }
                }, 10*(110-gc.map.speed));
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





