(function(definition) {
  if(typeof exports === 'object') {
    var KimchiArray = definition();
    module.exports = KimchiArray;
    exports.KimchiArray = KimchiArray;
  } else {
    KimchiArray = definition();
  }
})(function() {
  _ = require('lodash');
  var ArrayPrototype = Array.prototype;

  var KimchiArray = function(obj) {
    if(obj instanceof KimchiArray) return obj;
    if(!(this instanceof KimchiArray)) return new KimchiArray(obj);
    if(obj instanceof Array) {
      this.originalObject = obj;
    } else {
      throw new TypeError("Argument must be an array");
    }
  };

  KimchiArray.prototype = (function() {
    var result = {}
    for(var property in ["length", "indexOf", "toString"]) {
      result[property] = function() {
        ArrayPrototype[property].apply(this.originalObject, arguments);
      }
    };
    return result;
  })();

  _.extend(KimchiArray.prototype, (function() {
    var _first = function() {
      return this.originalObject[0];
    };

    var _last = function() {
      return this.originalObject[this.length - 1];
    };

    var _count = function() {
      return this.length;
    };

    var _destroy = function(element, errorCallback) {
      var index = this.indexOf(element);
      if(index >= 0) {
        return this.originalObject.splice(index, 1)[0];
      } else {
        return typeof errorCallback === 'function' ? errorCallback(this, element) : undefined;
      }
    };

    var _destroyAt = function(index) {
      return this.originalObject.splice(index, 1)[0];
    };

    var _destroyIf = function(callback) {
      var self = this,
      elements = this.originalObject.filter(callback);
      elements.forEach(function(element) {
        self.destroy(element);
      });
      return KimchiArray(elements);
    };

    var _clear = function() {
      this.originalObject.splice(0,this.length);
      return this;
    };

    var _collect = function(callback) {
      var array = [];
      this.originalObject.forEach(function(element) {
        array.push(callback(element));
      });
      return KimchiArray(array);
    };

    var _collectBang = function(callback) {
      this.originalObject.forEach(function(element, index, array) {
        array[index] = callback(element);
      });
      return this;
    };

    var _compact = function() {
      var result = this.originalObject.filter(function(element) {
        return(element !== undefined && element !== null);
      });
      return KimchiArray(result);
    };

    var _compactBang = function() {
      this.destroyIf(function(element) {
        return(element === undefined || element === null);
      });
      return this;
    };

    var _cycle = function(times, callback) {
      var self = this,
      result = [];
      if(typeof times === 'number') {
        while(times > 0) {
          result = result.concat(self.originalObject.map(callback));
          times--;
        }
      } else {
        while(true) {
          result = result.concat(self.originalObject.map(callback));
        }
      }
      return KimchiArray(result);
    };

    var _drop = function(num) {
      if(num > 0) {
        return KimchiArray(this.originalObject.slice(num));
      } else {
        throw new TypeError("Argument passed to drop should be a positive number");
      }
    };

    var _dropWhile = function(callback) {
      var i = 0, index;
      while(index === undefined && i < this.length) {
        if(!callback(this.originalObject[i])) {
          index = i;
        }
        i++;
      }
      return KimchiArray(this.originalObject.slice(index));
    };

    var _isEmpty = function() {
      return this.length === 0;
    };

    var _fetch = function(index, callback) {
      if(index < 0 || index >= this.length) {
        if(typeof callback !== 'function') {
          throw new TypeError("Index is not valid");
        } else {
          return callback(index, this);
        }
      } else {
        return this.originalObject[index];
      }
    };

    var _isEql = function(other) {
      return this.length === other.length &&
        this.originalObject.every(function(element, index) {
          return element === other.originalObject[index];
        });
    };

    return {
      constructor: KimchiArray,
      first: _first,
      last: _last,
      count: _count,
      destroy: _destroy,
      destroyAt: _destroyAt,
      destroyIf: _destroyIf,
      clear: _clear,
      collect: _collect,
      collectBang: _collectBang,
      compact: _compact,
      compactBang: _compactBang,
      cycle: _cycle,
      drop: _drop,
      dropWhile: _dropWhile,
      isEmpty: _isEmpty,
      fetch: _fetch,
      isEql: _isEql
    };
  })());

  return KimchiArray;
});
