//removeIf(production)
var Coordinates = require("./Coordinates.js");
//endRemoveIf(production)
class Barrier extends Coordinates {
    constructor(color, x, y) {
        super(x, y);
        this.color = color;
    }

    getColor() {
        return this.color;
    }

    setColor(color) {
        this.color = color;
    }
}



//removeIf(production)
module.exports = Barrier;
//endRemoveIf(production)