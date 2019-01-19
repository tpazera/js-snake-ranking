var helloworld = require("./../src/js/helloWorld");

describe('helloWorld', function () {
    it("should return Hello World when was invoke", function () {
        expect(helloworld()).toBe("Hello World");
    })
})