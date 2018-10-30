class Snake {
    
    constructor(map) {
        this.map = map;
        this.body = [];
        this.body[0] = {x: 3, y: 3};
        this.body[1] = {x: 2, y: 3};
    }

    draw() {
        for(let i = 0; i < this.body.length; i++) {
            ctx.fillStyle = (i == 0) ? "red" : "orange";
            ctx.fillRect(this.body[i].x*this.map.fieldSize, this.body[i].y*this.map.fieldSize, this.map.fieldSize, this.map.fieldSize);
        }
    }

    move() {
        let snakeX = this.body[0].x;
        let snakeY = this.body[0].y;

        if(d == "LEFT") snakeX -= 1;
        if(d == "RIGHT") snakeX += 1;
        if(d == "UP") snakeY -= 1;
        if(d == "DOWN") snakeY += 1;

        let newHead = {
            x: snakeX,
            y: snakeY
        }

        this.body.unshift(newHead);

    }

}