//removeIf(production)
var Coordinates = require("./Coordinates.js");
//endRemoveIf(production)
class Snake {
    
    constructor() {
        this.body = [];
        this.body[0] = new Coordinates(3, 3); 
        this.body[1] = new Coordinates(2, 3);
    }

    draw(map, ctx) {
        for(let i = 0; i < this.body.length; i++) {
            ctx.fillStyle = (i == 0) ? "red" : "orange";
            ctx.fillRect(this.body[i].getX()*map.fieldSize, this.body[i].getY()*map.fieldSize, map.fieldSize, map.fieldSize);
        }
    }

    move(direction) {
        let snakeX = this.body[0].getX();
        let snakeY = this.body[0].getY();

        if(direction == "LEFT") snakeX -= 1;
        if(direction == "RIGHT") snakeX += 1;
        if(direction == "UP") snakeY -= 1;
        if(direction == "DOWN") snakeY += 1;

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


//removeIf(production)
module.exports = Snake;
//endRemoveIf(production)