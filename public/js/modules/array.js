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

arrayProto.pack = function () {
  return this.filter(function (item) {
    return item !== void 0;
  });
};

if (!arrayProto.forEach) arrayProto.forEach = function (callback, context) {
  var len = this.length,
      i;

  context = context || this;

  for (i = 0; i < len; i += 1) {
    callback.call(context, this[i], i, this);
  }
};

if (!arrayProto.filter) arrayProto.filter = function (callback, context) {
  var result = [];

  context = context || this;

  this.forEach(function (item, i, arr) {
    if (callback.call(context, item, i, arr)) result.push(item);
  });

  return result;
};
