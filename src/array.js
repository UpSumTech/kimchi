(function() {
  var first = function() {
    return this[0];
  };

  Object.prototype.extend(
    Array.prototype,
    {
      first: first
    }
  );
}());
