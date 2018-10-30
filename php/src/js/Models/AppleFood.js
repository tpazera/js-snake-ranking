class AppleFood {

    constructor(map, snake) {
        this.map = map;
        this.barriers = map.barriersArray;
        this.snake = snake;
    }

    findLocation() {
        this.x = Math.floor(Math.random()*this.map.mapSize);
        this.y = Math.floor(Math.random()*this.map.mapSize);
        for(let i = 0; i < this.barriers.length; i++) {
            if(this.x == this.barriers[i].x && this.y == this.barriers[i].y) {
                return false;
            }
        }
        for(let i = 0; i < this.snake.body.length; i++) {
            if(this.x == this.snake.body[i].x && this.y == this.snake.body[i].y)
                return false;
        }
        return true;
    }

    create() {
        let boolFindLocation = this.findLocation();
        while(true) {
            if(boolFindLocation) break;
            else boolFindLocation = this.findLocation();
        }
    }

    draw() {
        ctx.drawImage(imageApple, this.x * this.map.fieldSize, this.y * this.map.fieldSize, this.map.fieldSize, this.map.fieldSize);
    }

    eat() {
        if(this.x == this.snake.body[0].x && this.y == this.snake.body[0].y) {
            this.create();
            return true;
        }
        return false;
    }

}