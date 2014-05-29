require('readline');
var expect = require('chai').expect;
Constant = require('../../src/constant.js');

describe('Constant', function(){
  describe('.get()', function(){
    describe('defined', function() {
      beforeEach(function() {
        Constant.set('TEST1', 'test value 1');
      });

      it('returns the constant', function(){
        expect(Constant.get('TEST1')).to.equal('test value 1');
      });
    });

    describe('undefined', function() {
      it('returns undefined', function(){
        expect(Constant.get('TEST0')).to.be.undefined
      });
    });
  });

  describe('.set()', function(){
    it('returns the constant', function(){
      Constant.set('TEST2', 'test value 2');
      expect(Constant.get('TEST2')).to.equal('test value 2');
    });
  });

  describe('.isDefined()', function(){
    describe('already set', function() {
      beforeEach(function() {
        Constant.set('TEST3', 'test value 3');
      });

      it('returns true', function(){
        expect(Constant.isDefined('TEST3')).to.equal.true;
      });
    });

    describe('not set', function() {
      it('returns false', function(){
        expect(Constant.isDefined('TEST4')).to.equal.false;
      });
    });
  })
});
