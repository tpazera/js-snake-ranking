class BarriersArray {
    constructor(barriersString, mapSize) {
        this.barriers = [];
        this.setBarriersFromString(barriersString, mapSize);
    }

    getBarriersArray() {
        return this.barriers;
    }

    setBarriersArray(barriers) {
        this.barriers = barriers;
    }

    setBarriersFromString(barriersString, mapSize) {
        this.barriers = [];
        let x = 0, color;
        for(let i = 0; i < mapSize; i++) {
            for(let j = 0; j < mapSize; j++) {
                if(barriersString[i*mapSize+j] == '1') {
                    if (x % 2) color = "#1a273d";
                    else color = "#161c26";
                    this.barriers.push(new Barrier(color, i, j));
                    x++;
                }
            }
        }
    }
}