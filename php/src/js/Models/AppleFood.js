//removeIf(production)
var Coordinates = require("./Coordinates.js");
//endRemoveIf(production)
class AppleFood extends Coordinates {

    constructor() {
        super(0, 0)
        this.imageApple = new Image(); 
        this.imageApple.src = "images/apple.png";
    }

    findLocation(map, snake) {
        this.setX(Math.floor(Math.random()*map.mapSize));
        this.setY(Math.floor(Math.random()*map.mapSize));
        let barriersArray = map.getBarriers().getBarriersArray();
        for(let i = 0; i < barriersArray.length; i++) {
            if(this.getX() == barriersArray[i].getX() && this.getY() == barriersArray[i].getY()) {
                return false;
            }
        }
        for(let i = 0; i < snake.body.length; i++) {
            if(this.getX() == snake.body[i].x && this.getY() == snake.body[i].y)
                return false;
        }
        return true;
    }

    create(map, snake) {
        let boolFindLocation = this.findLocation(map, snake);
        while(true) {
            if(boolFindLocation) break;
            else boolFindLocation = this.findLocation(map, snake);
        }
    }

    draw(map, ctx) {
        ctx.drawImage(this.imageApple, this.getX() * map.fieldSize, this.getY() * map.fieldSize, map.fieldSize, map.fieldSize);
    }

    eat(map, snake) {
        if(this.getX() == snake.body[0].x && this.getY() == snake.body[0].y) {
            this.create(map, snake);
            return true;
        }
        return false;
    }

}


//removeIf(production)
module.exports = AppleFood;
//endRemoveIf(production)