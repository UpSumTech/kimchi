require('../src/object.js');
require('../src/array.js');
var should = require('should');

describe('ArrayExt', function(){
  var subject;

  beforeEach(function() {
    subject = [1,2,3];
  });

  describe('#first()', function(){
    it('returns the first element of the array', function(){
      subject.first().should.equal(1);
    });
  });

  describe('#last()', function(){
    it('returns the last element of the array', function(){
      subject.last().should.equal(3);
    });
  });

  describe('#count()', function(){
    it('returns the count of the number of elements in the array', function(){
      subject.count().should.equal(3);
    });
  });

  describe('#destroy()', function(){
    describe("when the element exists in the array", function() {
      it('returns the deleted element', function(){
        subject.destroy(2).should.equal(2);
      });

      it('removes the element from the array', function() {
        subject.destroy(2);
        subject.should.not.include(2);
        subject.count().should.equal(2);
      });

      describe('when the element is the first element of the array', function() {
        it('deletes the element', function() {
          subject.destroy(1).should.equal(1);
          subject.should.not.include(1);
          subject.count().should.equal(2);
        });
      });

      describe('when the element is the last element of the array', function() {
        it('deletes the element', function() {
          subject.destroy(3).should.equal(3);
          subject.should.not.include(3);
          subject.count().should.equal(2);
        });
      });
    });

    describe("when the element does not exist in the array", function() {
      describe("when an error callback is not provided", function() {
        it('returns undefined', function(){
          should.equal(subject.destroy(5), undefined);
        });
      });

      describe("when an error callback is provided", function() {
        it("returns the value of the error callback", function() {
          subject.destroy(5, function(array, element) {return array.toString() + " does not contain " + element.toString();}).should.equal("1,2,3 does not contain 5");
        });
      });

      it('does not remove any element from the array', function() {
        subject.destroy(5);
        subject.count().should.equal(3);
      });
    });
  });

  describe("#destroyIf()", function() {
    describe("when the conditions match some elements", function() {
      it("deletes the elements matching the callback function", function() {
        subject.destroyIf(function(element) {return element % 2 === 0;});
        subject.should.not.include(2);
        subject.count().should.equal(2);
      });

      it("returns the array of the elements deleted", function() {
        subject.destroyIf(function(element) {return element % 2 === 0;}).should.eql([2]);
      });
    });

    describe("when the conditions do not match any element", function() {
      it("returns an empty array", function() {
        subject.destroyIf(function(element) {return element === 0;}).should.eql([]);
      });
    });
  });

  describe("#destroy_at()", function() {
    describe("when the index lies within the range of elements", function() {
      it("deletes the element at that index", function() {
        subject.destroyAt(1);
        subject.should.not.include(2);
        subject.count().should.equal(2);
      });

      it("returns the deleted element", function() {
        subject.destroyAt(-2).should.equal(2);
      });
    });

    describe("when the index lies outside the range of elements", function() {
      it("returns undefined", function() {
        should.equal(subject.destroyAt(3), undefined);
      });
    });
  });

  describe("#clear()", function() {
    it("removes all elements from the array", function() {
      subject.clear().should.eql([]);
    });
  });

  describe("#collect()", function() {
    it("returns an array containing the elements returned by the callback function", function() {
      subject.collect(function(element) {return element * element;}).should.eql([1,4,9]);
    });

    it("does not mutate the original array", function() {
      subject.collect(function(element) {return element * element;});
      subject.should.eql([1,2,3]);
    });
  });

  describe("#collectBang()", function() {
    it("updates the array with elements returned by the callback function", function() {
      subject.collectBang(function(element) {return element * element;}).should.eql([1,4,9]);
    });

    it("mutates the original array", function() {
      subject.collectBang(function(element) {return element * element;});
      subject.should.eql([1,4,9]);
    });
  });

  describe("#compact()", function() {
    it("removes undefined and null elements from the array and returns a new array", function() {
      subject.push(undefined);
      subject.push(null);
      subject.compact().should.eql([1,2,3]);
      subject.should.eql([1,2,3,undefined,null]);
    });
  });

  describe("#compactBang()", function() {
    it("removes undefined and null elements from the array and in turn mutates it", function() {
      subject.push(undefined);
      subject.push(null);
      subject.compactBang().should.eql([1,2,3]);
      subject.should.eql([1,2,3]);
    });
  });
});
