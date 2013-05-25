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

    var _destroy = function(element) {
      var index = this.indexOf(element);
      return (index >= 0 ? this.splice(index, 1).first() : undefined);
    };

    return {
      first: _first,
      last: _last,
      count: _count,
      destroy: _destroy
    };
  }());

  Object.prototype.extend(Array.prototype, ArrayExt);
}());
