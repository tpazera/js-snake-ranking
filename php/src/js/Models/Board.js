class Board {

	constructor(name, mapSize, speed, barriers) {
        this.name = name;
        this.mapSize = mapSize;
        this.speed = speed;
        this.barriers = barriers;
        this.barriersArray = [];
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

    generateFields() {
        this.fieldSize = $("#game-canvas").attr("height") / this.mapSize;
        for(let i = 0; i < this.mapSize; i++)
            for(let j = 0; j < this.mapSize; j++) {
                if(i%2 == j%2) ctx.fillStyle="#c9edb1";
                else ctx.fillStyle="#91dd5f";
                ctx.fillRect(i*this.fieldSize, j*this.fieldSize, this.fieldSize, this.fieldSize);
            }
    }

    generateBarriers() {
        let barriersArray = [];
        ctx.fillStyle="black";
        let x = 0;
        for(let i = 0; i < this.mapSize; i++)
            for(let j = 0; j < this.mapSize; j++) {
                if(this.barriers[i*this.mapSize+j] == '1') {
                    if (x % 2) ctx.fillStyle = "#1a273d";
                    else ctx.fillStyle = "#161c26";
                    barriersArray[x++] = {
                        x: i,
                        y: j
                    }
                    ctx.fillRect(i*this.fieldSize, j*this.fieldSize, this.fieldSize, this.fieldSize);
                }
            }
        
        this.barriersArray = barriersArray;
    }
}

