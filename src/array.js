(function() {
  var ArrayExt = (function() {
    var _first = function() {
      return this[0];
    };

    var _last = function() {
      return this[this.length - 1];
    };

    var _count = function() {
      return this.length;
    };

    var _destroy = function(element, errorCallback) {
      var index = this.indexOf(element);
      if(index >= 0) {
        return this.splice(index, 1).first();
      } else {
        return typeof errorCallback === 'function' ? errorCallback(this, element) : undefined;
      }
    };

    var _destroyAt = function(index) {
      return this.splice(index, 1).first();
    };

    var _destroyIf = function(callback) {
      var self = this,
        elements = this.filter(callback);
      elements.forEach(function(element) {
        self.destroy(element);
      });
      return elements;
    };

    var _clear = function() {
      this.splice(0,this.length);
      return this;
    };

    var _collect = function(callback) {
      var array = [];
      this.forEach(function(element) {
        array.push(callback(element));
      });
      return array;
    };

    var _collectBang = function(callback) {
      this.forEach(function(element, index, array) {
        array[index] = callback(element);
      });
      return this;
    };

    var _compact = function() {
      return this.filter(function(element) {return(element !== undefined && element !== null);});
    };

    var _compactBang = function() {
      this.destroyIf(function(element) {return(element === undefined || element === null);});
      return this;
    };

    var _cycle = function(times, callback) {
      var self = this,
        result = [];
      if(typeof times === 'number') {
        while(times > 0) {
          result = result.concat(self.map(callback));
          times--;
        }
      } else {
        while(true) {
          result = result.concat(self.map(callback));
        }
      }
      return result;
    };

    var _drop = function(num) {
      if(num > 0) {
        return this.slice(num);
      } else {
        throw new TypeError("Argument passed to drop should be a positive number");
      }
    };

    var _dropWhile = function(callback) {
      var i = 0, index;
      while(index === undefined && i < this.length) {
        if(!callback(this[i])) {
          index = i;
        }
        i++;
      }
      return this.slice(index);
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
        return this[index];
      }
    };

    return {
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
      fetch: _fetch
    };
  }());

  Object.prototype.extend(Array.prototype, ArrayExt);
}());
