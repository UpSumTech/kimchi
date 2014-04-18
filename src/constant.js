(function(definition) {
  if(typeof exports === 'object') {
    module.exports = definition();
  } else {
    Constant = definition();
  }
})(function() {
  var availableConstants = {},
    prefix = "$" + Math.random().toString().slice(2) + "_";

  var _get = function(name) {
    if(_isDefined(name)) {
      return availableConstants[prefix + name];
    }
    return undefined;
  };

  var _set = function(name, val) {
    if(Object.prototype.hasOwnProperty(name)) {
      throw("Constant name can not be similar to the property of an object");
    } else {
      if(_isDefined(name)) {
        throw("Constants cen not be redefined");
      } else {
        availableConstants[prefix + name] = val;
      }
    }
  };

  var _isDefined = function(name) {
    if(availableConstants[prefix + name]) {
      return true;
    }
    return false;
  };

  return {
    get: _get,
    set: _set,
    isDefined: _isDefined
  };
});
