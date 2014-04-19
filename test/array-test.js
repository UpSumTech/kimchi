require('../src/object.js');
var KimchiArray = require('../src/array.js');
require('readline');
var should = require('should');

describe('Array', function(){
  var subject;

  beforeEach(function() {
    subject = KimchiArray([1,2,3]);
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

  describe("#cycle()", function() {
    describe("when an integer specifying the number of times is provided", function() {
      it("cycles through the array and applies the callback function to it the given number of times", function() {
        subject.cycle(3, function(element) {return element * element;}).should.eql([1,4,9,1,4,9,1,4,9]);
      });
    });

    describe("when an integer specifying the number of times is not provided", function() {
      it("cycles through the array and applies the callback function to it the given number of times", function() {
        // Don't know how to test infinite loops
      });
    });
  });

  describe("#drop()", function() {
    describe("when a positive number is passed to the function", function() {
      describe("when the number is less than equal to the length of the array", function() {
        it("drops the first n elements and returns the rest of the array", function() {
          subject.drop(2).should.eql([3]);
        });
      });

      describe("when the number is greater than the length of the array", function() {
      });
    });

    describe("when a negative number is passed to the function", function() {
      it("throws an error", function() {
        var testFn = function() {subject.drop(-1);};
        testFn.should.throwError(/should be a positive number/);
      });
    });
  });

  describe("#dropWhile()", function() {
    describe("when at least one element matches the condition", function() {
      it("drops the elements up to, but not including the first element for which the block returns false", function() {
        subject.dropWhile(function(element) {return element % 2 !== 0;}).should.eql([2, 3]);
      });
    });

    describe("when no element matches the condition", function() {
      it("returns an empty array", function() {
        subject.dropWhile(function(element) {return element % 4 !== 0;}).should.eql(subject);
      });
    });
  });

  describe("#isEmpty()", function() {
    describe("when the array does not contain any element", function() {
      it("returns true", function() {
        [].isEmpty().should.be.true;
      });
    });

    describe("when the array contains at least one element", function() {
      it("returns false", function() {
        subject.isEmpty().should.be.false;
      });
    });
  });

  describe("#fetch()", function() {
    describe("when the index passed is valid", function() {
      it("returns the array element", function() {
        subject.fetch(1).should.eql(2);
      });
    });

    describe("when the index is invalid", function() {
      describe("when a callback function to handle the error is passed", function() {
        it("executes the callback", function() {
          subject.fetch(4, function(index, array) {return array.toString() + " does not have any element at index " + index.toString();}).should.eql("1,2,3 does not have any element at index 4");
        });
      });

      describe("when a callback is not passed", function() {
        it("throws an error", function() {
          var testFn = function() {subject.fetch(4);};
          testFn.should.throwError(/Index is not valid/);
        });
      });
    });
  });

  describe("#isEql()", function() {
    describe("when the arrays are same", function() {
      it("returns true", function() {
        subject.isEql([1,2,3]).should.be.true;
      });
    });

    describe("when the arrays are not the same", function() {
      describe("when one array is a subset of another", function() {
        it("returns false", function() {
          subject.isEql([1,2,3,4]).should.be.false;
        });
      });

      describe("when both arrays have same size but at least one element is different", function() {
        it("returns false", function() {
          subject.isEql([1,4,3]).should.be.false;
        });
      });
    });
  });
});
