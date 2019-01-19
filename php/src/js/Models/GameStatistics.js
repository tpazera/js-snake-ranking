class GameStatistics {

    constructor() {
        this.score = 0;
    }

    getScore() {
        return this.score;
    }

    increaseScore() {
        this.score += 5;
    }

}

//removeIf(production)
module.exports = GameStatistics;
//endRemoveIf(production)