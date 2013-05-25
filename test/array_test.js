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

  describe('#delete()', function(){
    describe("when the element exists in the array", function() {
      it('returns the deleted element', function(){
        subject.destroy(2).should.equal(2);
      });

      it('removes the element from the array', function() {
        subject.destroy(2);
        subject.indexOf(2).should.equal(-1);
        subject.count().should.equal(2);
      });

      describe('when the element is the first element of the array', function() {
        it('deletes the element', function() {
          subject.destroy(1).should.equal(1);
          subject.indexOf(1).should.equal(-1);
          subject.count().should.equal(2);
        });
      });

      describe('when the element is the last element of the array', function() {
        it('deletes the element', function() {
          subject.destroy(3).should.equal(3);
          subject.indexOf(3).should.equal(-1);
          subject.count().should.equal(2);
        });
      });
    });

    describe("when the element does not exist in the array", function() {
      it('returns undefined', function(){
        should.equal(subject.destroy(5), undefined);
      });

      it('does not remove any element from the array', function() {
        subject.destroy(5);
        subject.count().should.equal(3);
      });
    });
  });
});
