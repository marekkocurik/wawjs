const assert = require("assert");

describe("cvicenie04 - Object properties concepts", function() {

  const {
    allOwnKeys,
    allOwnValues,
    allOwnEntries,
    getProtoChain,
    allKeys,
    forIn,
    shallowClone,
    hasInheritedProperty,
    hasOverridenProperty
  } = require("../src/introspect.js");

  describe("Object.keys", function() {

    it("allOwnKeys() works for Strings and Symbols", function() {
      let o = { a: 10 };
      let s = Symbol();
      o[s] = 20;

      assert(Object.keys(o), ["a"],
        "Object.keys() does not return Symbols");


      assert.deepStrictEqual(allOwnKeys(o), ['a', s],
        "allOwnKeys returns also symbols");
    });

    it("allOwnKeys() works for non enumerable as well", function() {
      let o = { a: 10 };
      Object.defineProperty(o, 'b', {
        value: 20,
        enumerable: false
      });

      assert(Object.keys(o), ["a"],
        "Object.keys() does not return non enumerable props");


      assert.deepStrictEqual(allOwnKeys(o), ['a', 'b'],
        "allOwnKeys returns also non enumerable");
    });
  });

});
