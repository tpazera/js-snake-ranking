class BoardList {

    constructor() {
        this.boardList = new Map();
        this.boardList.set("Easy", new Board("Easy",10,70, new BarriersArray("", 10)));
        this.boardList.set("Medium", new Board("Medium",15,90, new BarriersArray("", 15)));
        this.boardList.set("Hard", new Board("Hard",10,90, new BarriersArray("0000000000011100111001000000100100000010000000000000000000000100000010010000001001110011100000000000", 10)));
    }

    getBoardList() { return this.boardList; }

    getSpecifiedMap(map_name) {
        return this.boardList.get(map_name);
    }

}