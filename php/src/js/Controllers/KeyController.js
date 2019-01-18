//STOP MOVING PAGE
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

document.addEventListener("keydown", directionChange);

function directionChange(event) {
    if(kc.locked == "undefined" || kc.locked == null || kc.locked == undefined) kc.locked = false;
    if(!kc.locked) {
        if (event.keyCode == 37 && kc.direction != "RIGHT") kc.direction = "LEFT";
        if (event.keyCode == 38 && kc.direction != "DOWN") kc.direction = "UP";
        if (event.keyCode == 39 && kc.direction != "LEFT") kc.direction = "RIGHT";
        if (event.keyCode == 40 && kc.direction != "UP") kc.direction = "DOWN";
        kc.locked = true;
    }
}

class KeyController {

    constructor() {
        this.direction = "RIGHT";
        this.locked = false;
        
    }

    getDirection() {
        return this.direction;
    }

    setDirection(direction) {
        this.direction = direction;
    }
}

