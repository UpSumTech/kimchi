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

    var _destroy_at = function(index) {
      return this.splice(index, 1).first();
    };

    var _destroy_if = function(callback) {
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

    return {
      first: _first,
      last: _last,
      count: _count,
      destroy: _destroy,
      destroy_at: _destroy_at,
      destroy_if: _destroy_if,
      clear: _clear
    };
  }());

  Object.prototype.extend(Array.prototype, ArrayExt);
}());
