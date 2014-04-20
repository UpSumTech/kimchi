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
      this._originalObject = obj;
    } else {
      throw new TypeError("Argument must be an array");
    }
  };

  KimchiArray.prototype = (function() {
    var _elements = function() {
      return this._originalObject;
    };

    var _toS = function() {
      return this.elements().toString();
    };

    var _insert = function() {
      var args = Array.prototype.slice.call(arguments);
      if(args.length == 0) throw new TypeError("Insert needs at least one argument");
      if(args.length == 1) {
        this.elements().push(args[0]);
      } else {
        var self = this;
        args.slice(1).forEach(function(obj, index) {
          self.elements().splice(args[0] + index, 0, obj);
        });
      }
    };

    var _index = function(obj, callback) {
      return this.elements().indexOf(obj);
    };

    var _first = function() {
      return this.elements()[0];
    };

    var _last = function() {
      return this.elements()[this.elements().length - 1];
    };

    var _count = function() {
      return this.elements().length;
    };

    var _destroy = function(element, errorCallback) {
      var index = this.elements().indexOf(element);
      if(index >= 0) {
        return this.elements().splice(index, 1)[0];
      } else {
        return typeof errorCallback === 'function' ? errorCallback(this, element) : undefined;
      }
    };

    var _destroyAt = function(index) {
      return this.elements().splice(index, 1)[0];
    };

    var _destroyIf = function(callback) {
      var self = this,
      elements = this.elements().filter(callback);
      elements.forEach(function(element) {
        self.destroy(element);
      });
      return KimchiArray(elements);
    };

    var _clear = function() {
      this.elements().splice(0,this.elements().length);
      return this;
    };

    var _collect = function(callback) {
      var array = [];
      this.elements().forEach(function(element) {
        array.push(callback(element));
      });
      return KimchiArray(array);
    };

    var _collectBang = function(callback) {
      this.elements().forEach(function(element, index, array) {
        array[index] = callback(element);
      });
      return this;
    };

    var _compact = function() {
      var result = this.elements().filter(function(element) {
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
          result = result.concat(self.elements().map(callback));
          times--;
        }
      } else {
        while(true) {
          result = result.concat(self.elements().map(callback));
        }
      }
      return KimchiArray(result);
    };

    var _drop = function(num) {
      if(num > 0) {
        return KimchiArray(this.elements().slice(num));
      } else {
        throw new TypeError("Argument passed to drop should be a positive number");
      }
    };

    var _dropWhile = function(callback) {
      var i = 0, index;
      while(index === undefined && i < this.elements().length) {
        if(!callback(this.elements()[i])) {
          index = i;
        }
        i++;
      }
      return KimchiArray(this.elements().slice(index));
    };

    var _isEmpty = function() {
      return this.elements().length === 0;
    };

    var _fetch = function(index, callback) {
      if(index < 0 || index >= this.elements().length) {
        if(typeof callback !== 'function') {
          throw new TypeError("Index is not valid");
        } else {
          return callback(index, this);
        }
      } else {
        return this.elements()[index];
      }
    };

    var _isEql = function(other) {
      return this.elements().length === other.elements().length &&
        this.elements().every(function(element, index) {
          return element === other.elements()[index];
        });
    };

    return {
      constructor: KimchiArray,
      toS: _toS,
      elements: _elements,
      insert: _insert,
      index: _index,
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
  })();

  return KimchiArray;
});
