(function(definition) {
  if(typeof exports === 'object') {
    module.exports = definition();
  } else {
    Validation = definition();
  }
})(function() {
  _ = require('lodash');

  var V = function() {
    this.validators = {};
    this.validations = {};
    this.messages = [];
  };

  V.prototype = (function() {
    var _throwValidationRegistrationError = function() {
      throw {
        name: 'ValidationRegistrationError',
        message: 'Validator types in the validation should be specified as arrays'
      };
    };

    var _throwUnregisteredValidatorError = function(types) {
      throw {
        name: 'UnregisteredValidatorError',
        message: 'No validators ' + types.toString() + ' has been registered'
      };
    };

    var _throwInvalidValidatorError = function() {
      throw {
        name: 'InvalidValidatorError',
        message: 'Validator is not a function'
      };
    };

    var _throwValidatorAlreadyRegistered = function(name) {
      throw {
        name: 'ValidatorAlreadyRegistered',
        message: 'Validator ' + name + ' is already registered'
      };
    };

    var _registerValidator = function(name, validator) {
      if(!_.isFunction(validator.isValid)) {
        _throwInvalidValidatorError();
      } else if(this.validators.hasOwnProperty(name)) {
        _throwValidatorAlreadyRegisteredError();
      } else {
        this.validators[name] = validator;
      }
    };

    var _registerValidations = function(attr, validations) {
      if(!_.isArray(validations)) {
        _throwValidationRegistrationError();
      } else{
        unregisteredValidators = _.difference(validations, _.keys(this.validators));
        if(!_.isEmpty(unregisteredValidators)){
          _throwUnregisteredValidatorError(unregisteredValidators);
        } else {
          this.validations[attr] = validations;
        }
      }
    };

    var _validateAttribute = function(types, attribute, value) {
      var validator,
      self = this;

      _.each(types, function(type) {
        validator = self.validators[type];
        if(!validator) { _throwValidatorRegistrationError(type); }
        return validator.isValid(value) ? undefined : (attribute + " " + validator.message);
      });
    };

    var _concatenateMessages = function(errors) {
      var str = "";
      if(!_.isEmpty(errors)) {
        str += "The following errors occured : ";
        str = _.reduce(errors, function(result, error, key) {
          return(result + error + ',');
        }, str);
        str = str.substr(0, str.length - 1);
      }
      if(!_.isEmpty(str)) {
        return str;
      }
    };

    var _validate = function(data) {
      var type,
        self = this;

      return _.reduce(self.validations, function(errors, types, key) {
        error = _validateAttribute.apply(self, [types, key, data[key]]);
        if(!_.isUndefined(error)) { errors[key] = error; }
        return errors;
      }, {});
    };

    return {
      registerValidator: function(name, validator) { _registerValidator.apply(this, [name, validator]); },
      registerValidations: function(attr, types) { _registerValidations.apply(this, [attr, types]); },
      isValid: function(data) {
        errors = _validate.apply(this, [data]);
        return(_.isEmpty(errors));
      }
    };
  })();

  return V;
});
