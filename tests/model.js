// For jshint.
/*global no: true, module: true, test: true, ok: true, equal: true */

include('../src/no/no.js');
include('../src/no/no.promise.js');
include('../src/no/no.js');
include('../src/no/no.object.js');
include('../src/no/no.http.js');
include('../src/no/no.promise.js');

include('../src/no/no.model.js');

// ----------------------------------------------------------------------------------------------------------------- //
module("key");

test("Sorting", function() {
    expect(2);

    no.Model.define('first', {
        params: {
            "a": null,
            "b": null
        }
    });
    equal(no.Model.key("first", { a: 1, b: 3 }), "model=first&a=1&b=3", "Sorting: a first");

    no.Model.define('second', {
        params: {
            "b": null,
            "a": null
        }
    });
    equal(no.Model.key("second", { a: 1, b: 3 }), "model=second&b=3&a=1", "Sorting: model params goes in the same order as specified in model info");

    // cleanup
    no.Model._infos = {};
    no.Model._classes = {};
});

test("Missing params", function() {
    expect(2);

    no.Model.define('first', {
        params: {
            "a": null,
            "b": null
        }
    });
    equal(no.Model.key("first", { a: 1 }), "model=first&a=1", "Key will be created using specified params, missing params are ignored");

    no.Model.define('first', {
        params: {
            "a": null,
            "b": null
        }
    }, no.Model);
    equal(no.Model.key("first", { a: 1, c: 3 }), "model=first&a=1", "Only keyParams will be used in key");

    // cleanup
    no.Model._infos = {};
    no.Model._classes = {};
});

test("defaults", function() {
    expect(4);

    no.Model.define('first', {
        params: {
            "a": null,
            "b": null,
            "c": "hello"
        }
    }, no.Model);

    equal(no.Model.key("first", { a: 1, b: 2 }), "model=first&a=1&b=2&c=hello", "Default value is placed in key, when parameter is not specified");
    equal(no.Model.key("first", { a: 1, b: 2, c: null }), "model=first&a=1&b=2", "parameter=null is a valid value for parameter");
    equal(no.Model.key("first", { a: 1, b: 2, c: undefined }), "model=first&a=1&b=2&c=hello", "Default value is used when parameter=undefined");
    equal(no.Model.key("first", { a: 1, b: 2, c: 3 }), "model=first&a=1&b=2&c=3", "Default value is replaced in key, when parameter specified");
});
