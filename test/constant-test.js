require('readline');
var should = require('should');
Constant = require('../src/constant');

describe('Constant', function(){
  describe('.get()', function(){
    describe('defined', function() {
      beforeEach(function() {
        Constant.set('TEST1', 'test value 1');
      });

      it('returns the constant', function(){
        Constant.get('TEST1').should.equal('test value 1');
      });
    });

    describe('undefined', function() {
      it('returns undefined', function(){
        should(Constant.get('TEST0')).be.type('undefined');
      });
    });
  });

  describe('.set()', function(){
    it('returns the constant', function(){
      Constant.set('TEST2', 'test value 2');
      Constant.get('TEST2').should.equal('test value 2');
    });
  });

  describe('.isDefined()', function(){
    describe('already set', function() {
      beforeEach(function() {
        Constant.set('TEST3', 'test value 3');
      });

      it('returns true', function(){
        Constant.isDefined('TEST3').should.equal.true;
      });
    });

    describe('not set', function() {
      it('returns false', function(){
        Constant.isDefined('TEST4').should.equal.false;
      });
    });
  })
});
