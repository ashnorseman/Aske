/**
 * Created by AshZhang on 15/6/27.
 */



if (!Array.isArray) Array.isArray = function (obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
};

arrayProto.contains = function (item) {
  var len = this.length,
      i;

  for (i = 0; i < len; i += 1) {
    if (this[i] === item) return true;
  }

  return false;
};

if (!arrayProto.forEach) arrayProto.forEach = function (callback, context) {
  var len = this.length,
      i;

  context = context || null;

  for (i = 0; i < len; i += 1) {
    callback.call(context, this[i], i, this);
  }
};
