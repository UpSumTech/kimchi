require('readline');
should = require('should');
Validation = require('../src/validation.js');

describe('Validation', function() {
  var subject

  beforeEach(function() {
    subject = new Validation();
    subject.registerValidator("isPresent", {
      message: "is not present",
      isValid: function(value) {
        return !(_.isUndefined(value) || _.isNull(value) || _.isEmpty(value));
      }
    });
    subject.registerValidations("foo", ["isPresent"]);
  });

  describe("#registerValidator", function() {
    describe("when the validator is a function", function() {
      describe("when the validator has not been registered before", function() {
        it("registers the validator", function() {
          subject.validators.should.have.property("isPresent");
        });
      });

      describe("when the validator has already been registered", function() {
        it("throws an error", function() {
          (function() {
            subject.registerValidator("isPresent", {
              message: "is not present",
              isValid: function(value) {
                return !(value === undefined || value === null);
              }
            });
          }).should.throw();
        });
      });
    });

    describe("when the validator is not a function", function() {
      it("throws an error", function() {
         (function() {
           subject.registerValidator("isString", {message: "is not a string", isValid: true});
         }).should.throw();
      });
    });
  });

  describe("#registerValidations", function() {
    describe("when the validators is not an array", function() {
      it("throws an error", function() {
        (function() {
          subject.registerValidations("bar", "isPresent");
        }).should.throw();
      });
    });

    describe("when the validators is an array", function() {
      describe("when the validators have not been registered", function() {
        it("throws an error", function() {
          (function() {
            subject.registerValidations("bar", ["isPresent", "isString"]);
          }).should.throw();
        });
      });

      describe("when the validators have been registered", function() {
        it("registers the validation", function() {
          subject.registerValidations("bar", ["isPresent"]);
          subject.validations.bar.should.containEql("isPresent");
        });
      });
    });
  });

  describe("#isValid", function() {
    describe("when the data is valid", function() {
      it("returns true", function() {
        subject.isValid({foo: ["bar"]}).should.equal.true;
      });
    });

    describe("when the data is not valid", function() {
      it("returns false", function() {
        subject.isValid({foo: []}).should.equal.false;
      });
    });
  });
});
