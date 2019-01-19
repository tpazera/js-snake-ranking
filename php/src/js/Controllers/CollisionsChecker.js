
class CollisionsChecker {

    constructor() {}

    collisionWithBarriers(snake, map) {
        let barriersArray = map.getBarriers().getBarriersArray();
        for(let i = 0; i < barriersArray.length; i++) {
            if(barriersArray[i].getX() == snake.body[0].getX() && snake.body[0].getY() == barriersArray[i].getY()) {
                return true;
            }
        }
        return false;
    } 
    
    collisionWithSnake(snake) {
        for(let i = 1; i < snake.body.length; i++) {
            if(snake.body[0].getX() == snake.body[i].getX() && snake.body[0].getY() == snake.body[i].getY()) {
                return true;
            }
        }
        return false;
    }
    
    collisionWithBorder(snake, mapSize) {
        if(snake.body[0].getX() == -1 || snake.body[0].getX() == mapSize || snake.body[0].getY() == -1 || snake.body[0].getY() == mapSize) {
            return true;
        }
        return false;
    }

}


//removeIf(production)
module.exports = CollisionsChecker;
//endRemoveIf(production)