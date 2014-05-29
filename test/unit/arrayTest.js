require('../../src/object.js');
var KimchiArray = require('../../src/array.js');
require('readline');
var expect = require('chai').expect;

describe('Array', function(){
  var subject;

  beforeEach(function() {
    subject = KimchiArray([1,2,3]);
  });

  describe('#toS()', function() {
    it('returns the string representation of the array', function() {
      expect(subject.toS()).to.equal('1,2,3');
    });
  });

  describe('#insert()', function() {
    describe('when one argument is provided', function() {
      it('inserts an element at the end of the array', function() {
        subject.insert(5);
        expect(subject.count()).to.equal(4);
        expect(subject.index(5)).to.equal(3);
      });
    });

    describe('when multiple arguments are provided', function() {
      describe('when a single element is provided for insertion', function() {
        it('inserts an element into the array', function() {
          subject.insert(1, 5);
          expect(subject.count()).to.equal(4);
          expect(subject.index(5)).to.equal(1);
        });
      });

      describe('when multiple elements are provided for insertion', function() {
        it('inserts the elements into the array', function() {
          subject.insert(1, 5, 6,7);
          expect(subject.count()).to.equal(6);
          expect(subject.index(5)).to.equal(1);
          expect(subject.index(6)).to.equal(2);
          expect(subject.index(7)).to.equal(3);
        });
      });
    });

    describe('when no arguments are provided', function() {
      it('throws an error', function() {
        var testFn = function() {subject.insert();};
        expect(testFn).to.throw(Error, /needs at least one argument/);
      });
    });
  });

  describe('#first()', function(){
    it('returns the first element of the array', function(){
      expect(subject.first()).to.equal(1);
    });
  });

  describe('#last()', function(){
    it('returns the last element of the array', function(){
      expect(subject.last()).to.equal(3);
    });
  });

  describe('#count()', function(){
    it('returns the count of the number of elements in the array', function(){
      expect(subject.count()).to.equal(3);
    });
  });

  describe('#destroy()', function(){
    describe("when the element exists in the array", function() {
      it('returns the deleted element', function(){
        expect(subject.destroy(2)).to.equal(2);
      });

      it('removes the element from the array', function() {
        subject.destroy(2);
        expect(subject).to.not.include(2);
        expect(subject.count()).to.equal(2);
      });

      describe('when the element is the first element of the array', function() {
        it('deletes the element', function() {
          expect(subject.destroy(1)).to.equal(1);
          expect(subject).to.not.include(1);
          expect(subject.count()).to.equal(2);
        });
      });

      describe('when the element is the last element of the array', function() {
        it('deletes the element', function() {
          expect(subject.destroy(3)).to.equal(3);
          expect(subject).to.not.include(3);
          expect(subject.count()).to.equal(2);
        });
      });
    });

    describe("when the element does not exist in the array", function() {
      describe("when an error callback is not provided", function() {
        it('returns undefined', function(){
          expect(subject.destroy(5)).to.be.undefined;
        });
      });

      describe("when an error callback is provided", function() {
        it("returns the value of the error callback", function() {
          expect(subject.destroy(5, function(array, element) {return array.toS() + " does not contain " + element.toString();})).to.equal("1,2,3 does not contain 5");
        });
      });

      it('does not remove any element from the array', function() {
        subject.destroy(5);
        expect(subject.count()).to.equal(3);
      });
    });
  });

  describe("#destroyIf()", function() {
    describe("when the conditions match some elements", function() {
      it("deletes the elements matching the callback function", function() {
        subject.destroyIf(function(element) {return element % 2 === 0;});
        expect(subject).to.not.include(2);
        expect(subject.count()).to.equal(2);
      });

      it("returns the array of the elements deleted", function() {
        expect(subject.destroyIf(function(element) {return element % 2 === 0;}).elements()).to.eql([2]);
      });
    });

    describe("when the conditions do not match any element", function() {
      it("returns an empty array", function() {
        expect(subject.destroyIf(function(element) {return element === 0;}).isEmpty()).to.be.true;
      });
    });
  });

  describe("#destroy_at()", function() {
    describe("when the index lies within the range of elements", function() {
      it("deletes the element at that index", function() {
        subject.destroyAt(1);
        expect(subject).to.not.include(2);
        expect(subject.count()).to.equal(2);
      });

      it("returns the deleted element", function() {
        expect(subject.destroyAt(-2)).to.equal(2);
      });
    });

    describe("when the index lies outside the range of elements", function() {
      it("returns undefined", function() {
        expect(subject.destroyAt(3)).to.be.undefined;
      });
    });
  });

  describe("#clear()", function() {
    it("removes all elements from the array", function() {
      expect(subject.clear().isEmpty()).to.be.true;
    });
  });

  describe("#collect()", function() {
    it("returns an array containing the elements returned by the callback function", function() {
      expect(subject.collect(function(element) {return element * element;}).elements()).to.eql([1,4,9]);
    });

    it("does not mutate the original array", function() {
      var result = subject.collect(function(element) {return element * element;});
      expect(result.elements()).to.eql([1,4,9]);
      expect(subject.elements()).to.eql([1,2,3]);
    });
  });

  describe("#collectBang()", function() {
    it("updates the array with elements returned by the callback function", function() {
      expect(subject.collectBang(function(element) {return element * element;}).elements()).to.eql([1,4,9]);
    });

    it("mutates the original array", function() {
      subject.collectBang(function(element) {return element * element;});
      expect(subject.elements()).to.eql([1,4,9]);
    });
  });

  describe("#compact()", function() {
    it("removes undefined and null elements from the array and returns a new array", function() {
      subject.insert(undefined);
      subject.insert(null);
      expect(subject.compact().elements()).to.eql([1,2,3]);
      expect(subject.elements()).to.eql([1,2,3,undefined,null]);
    });
  });

  describe("#compactBang()", function() {
    it("removes undefined and null elements from the array and in turn mutates it", function() {
      subject.insert(undefined);
      subject.insert(null);
      expect(subject.compactBang().elements()).to.eql([1,2,3]);
      expect(subject.elements()).to.eql([1,2,3]);
    });
  });

  describe("#cycle()", function() {
    describe("when an integer specifying the number of times is provided", function() {
      it("cycles through the array and applies the callback function to it the given number of times", function() {
        expect(subject.cycle(3, function(element) {return element * element;}).elements()).to.eql([1,4,9,1,4,9,1,4,9]);
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
          expect(subject.drop(2).elements()).to.eql([3]);
        });
      });

      describe("when the number is greater than the length of the array", function() {
      });
    });

    describe("when a negative number is passed to the function", function() {
      it("throws an error", function() {
        var testFn = function() {subject.drop(-1);};
        expect(testFn).to.throw(Error, /should be a positive number/);
      });
    });
  });

  describe("#dropWhile()", function() {
    describe("when at least one element matches the condition", function() {
      it("drops the elements up to, but not including the first element for which the block returns false", function() {
        expect(subject.dropWhile(function(element) {return element % 2 !== 0;}).elements()).to.eql([2, 3]);
      });
    });

    describe("when no element matches the condition", function() {
      it("returns an empty array", function() {
        expect(subject.dropWhile(function(element) {return element % 4 !== 0;})).to.eql(subject);
      });
    });
  });

  describe("#isEmpty()", function() {
    describe("when the array does not contain any element", function() {
      it("returns true", function() {
        expect(KimchiArray([]).isEmpty()).to.be.true;
      });
    });

    describe("when the array contains at least one element", function() {
      it("returns false", function() {
        expect(subject.isEmpty()).to.be.false;
      });
    });
  });

  describe("#fetch()", function() {
    describe("when the index passed is valid", function() {
      it("returns the array element", function() {
        expect(subject.fetch(1)).to.eql(2);
      });
    });

    describe("when the index is invalid", function() {
      describe("when a callback function to handle the error is passed", function() {
        it("executes the callback", function() {
          expect(subject.fetch(4, function(index, array) {return array.toS() + " does not have any element at index " + index.toString();})).to.eql("1,2,3 does not have any element at index 4");
        });
      });

      describe("when a callback is not passed", function() {
        it("throws an error", function() {
          var testFn = function() {subject.fetch(4);};
          expect(testFn).to.throw(Error, /Index is not valid/);
        });
      });
    });
  });

  describe("#isEql()", function() {
    describe("when the arrays are same", function() {
      it("returns true", function() {
        expect(subject.isEql(KimchiArray([1,2,3]))).to.be.true;
      });
    });

    describe("when the arrays are not the same", function() {
      describe("when one array is a subset of another", function() {
        it("returns false", function() {
          expect(subject.isEql(KimchiArray([1,2,3,4]))).to.be.false;
        });
      });

      describe("when both arrays have same size but at least one element is different", function() {
        it("returns false", function() {
          expect(subject.isEql(KimchiArray([1,4,3]))).to.be.false;
        });
      });
    });
  });
});
