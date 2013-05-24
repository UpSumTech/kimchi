module.exports = require('../src/object.js');
module.exports = require('../src/array.js');

var assert = require("assert");
describe('Array', function(){
  describe('#first()', function(){
    it('returns the first element of the array', function(){
      assert.equal(1, [1,2,3].first());
    });
  });
});
