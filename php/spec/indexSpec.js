var { JSDOM } = require('jsdom');

describe('index.php', function () {

    var browser;

    beforeEach(function (done) {
        JSDOM.fromFile("./src/index.php", function () {

        }).then(function (resp) {
            browser = resp;
            done();
        });
    });

    afterEach(function () {
        browser.window.close();
    });

    it('has start-button element', function () {
        var el = browser.window.document.querySelector('.start-button');
        expect(el).not.toBe(null);
    })

    it('start-button contains GAME', function () {
        var el = browser.window.document.querySelector('.start-button');
        expect(el.textContent).toBe("GAME");
    })

    it('has ranking-button element', function () {
        var el = browser.window.document.querySelector('.ranking-button');
        expect(el).not.toBe(null);
    })

    it('ranking-button contains GAME', function () {
        var el = browser.window.document.querySelector('.ranking-button');
        expect(el.textContent).toBe("RANKING");
    })

    it('has h1 element', function () {
        var el = browser.window.document.querySelector('h1');
        expect(el).not.toBe(null);
    })

    it('has select element', function () {
        var el = browser.window.document.querySelector('select');
        expect(el).not.toBe(null);
    })

    it('has input type text element', function () {
        var el = browser.window.document.querySelector('input[type=text]');
        expect(el).not.toBe(null);
    })

    it('has input type text element', function () {
        var el = browser.window.document.querySelector('input[type=text]');
        expect(el.value).toBe("Points: ");
    })

    it('has canvas element', function () {
        var el = browser.window.document.querySelector('canvas');
        expect(el).not.toBe(null);
    })

    it('has table element', function () {
        var el = browser.window.document.querySelector('table');
        expect(el).not.toBe(null);
    })

})