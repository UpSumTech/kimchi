(function() {
  var extend = function() {
    var args = Array.prototype.slice.call(arguments, 0),
      destination = args[0],
      sources = args.slice(1);

    sources.forEach(function(source) {
      for(var property in source) {
        destination[property] = source[property];
      }
    });
  };

  extend(Object.prototype, {extend: extend});
}());
