
// Document
// ---------------------------


docProto.qs = function (selector) {
  return this.querySelector(selector);
};

docProto.qsa = function (selector) {
  return slice.call(this.querySelectorAll(selector));
};

docProto.ready = function (cb) {
  var callback;

  if (d.readyState === 'interactive' || d.readyState === 'complete') {
    cb.call(this);
    return this;
  }

  callback = function callback() {

    if (d.readyState === 'interactive' || d.readyState === 'complete') {
      cb.call(this);
      this.off('readystatechange', callback);
    }
  };

  this.on('readystatechange', callback);

  return this;
};
