function loader(items, loadFunction, allDone) {
    if (!items) { return; }

    //convert single item to array
    if ("undefined" === items.length) { items = [items]; }

    var count = items.length;

    var checkIfAllLoaded = function (items, i) {
        count--;
        if (0 == count) {
            allDone(items);
        }
    };

    for (var i = 0; i < items.length; i++) {
        loadFunction(items, i, checkIfAllLoaded);
    }
}

function loadImage(items, i, onComplete) {
    var onLoad = function (e) {
        e.target.removeEventListener("load", onLoad);
        onComplete(items, i);
    }
    var img = new Image();
    img.addEventListener("load", onLoad, false);
    img.src = items[i];
}

