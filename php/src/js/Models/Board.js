class Board {

	constructor(name, mapSize, speed, barriers) {
        this.name = name;
        this.mapSize = mapSize;
        this.speed = speed;
        this.barriers = barriers;
        this.fieldSize = $("#game-canvas").attr("height") / this.mapSize;
    }
    
	getName() { return this.name; }
	getMapSize() { return this.mapSize; }
	getSpeed() { return this.speed; }
    getBarriers() { return this.barriers; }

    setName(name) { this.name = name; }
    setMapSize(mapSize) { this.mapSize = mapSize; }
    setSpeed(speed) { this.speed = speed; }
    setBarriers(barriers) { this.barriers = barriers; }

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
        for(let i = 0; i < this.mapSize; i++) {
            for(let j = 0; j < this.mapSize; j++) {
                if(i%2 == j%2) ctx.fillStyle="#c9edb1";
                else ctx.fillStyle="#91dd5f";
                ctx.fillRect(i*fieldSize, j*fieldSize, fieldSize, fieldSize);
            }
        }
    }

    generateBarriers(ctx) {
        let fieldSize = $("#game-canvas").attr("height") / this.mapSize;
        let barriersArray = this.barriers.getBarriersArray();
        for(let i = 0; i < barriersArray.length; i++) {
            ctx.fillStyle = barriersArray[i].getColor(); 
            ctx.fillRect(barriersArray[i].getX()*fieldSize, barriersArray[i].getY()*fieldSize, fieldSize, fieldSize)
        }
    }
}

