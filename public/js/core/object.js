
// Object
// ---------------------------


objectProto.extend = function () {
  var len = arguments.length,
      i, src, key;

  for (i = 0; i < len; i += 1) {
    src = arguments[i];

    for (key in src) if (src.hasOwnProperty(key)) {
      this[key] = src[key];
    }
  }

  return this;
};
