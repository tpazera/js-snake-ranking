class ImagesLoader {

    constructor() { }

    loader(items, loadFunction, allDone) {
        if (!items) { return; }
    
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
    
    loadImage(items, i, onComplete) {
        var onLoad = function (e) {
            e.target.removeEventListener("load", onLoad);
            onComplete(items, i);
        }
        var img = new Image();
        img.addEventListener("load", onLoad, false);
        img.src = items[i];
    }

}

