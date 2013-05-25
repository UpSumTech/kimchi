require('../src/object.js');
require('../src/array.js');
var should = require('should');

var assert = require("assert");
describe('Array', function(){
  describe('#first()', function(){
    it('returns the first element of the array', function(){
      assert.equal(1, [1,2,3].first());
    });
  });
});
