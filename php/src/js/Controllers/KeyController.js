document.addEventListener("keydown", direction);

let d = "RIGHT";
let locked = false;

function direction(event) {
    if(!locked) {
        if (event.keyCode == 37 && d != "RIGHT") d = "LEFT";
        if (event.keyCode == 38 && d != "DOWN") d = "UP";
        if (event.keyCode == 39 && d != "LEFT") d = "RIGHT";
        if (event.keyCode == 40 && d != "UP") d = "DOWN";
        locked = true;
    }
}