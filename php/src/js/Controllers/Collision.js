
function collisionWithBarriers(snake, map) {
    for(let i = 0; i < map.barriersArray.length; i++) {
        if(map.barriersArray[i].x == snake.body[0].x && snake.body[0].y == map.barriersArray[i].y) {
            return true;
        }
    }
    return false;
}

function collisionWithSnake(snake) {
    for(let i = 1; i < snake.body.length; i++) {
        if(snake.body[0].x == snake.body[i].x && snake.body[0].y == snake.body[i].y) {
            return true;
        }
    }
    return false;
}

function collisionWithBorder(snake, mapSize) {
    if(snake.body[0].x == -1 || snake.body[0].x == mapSize || snake.body[0].y == -1 || snake.body[0].y == mapSize) {
        console.log(snake.body[0].x + " " + snake.body[0].y + " " + mapSize);
        return true;
    }
    return false;
}