/**
 * Created by AshZhang on 15/6/28.
 */


HTMLDocument.prototype.qs = function (selector) {
  return this.querySelector(selector);
};

HTMLDocument.prototype.qsa = function (selector) {
  return Array.prototype.slice.call(this.querySelectorAll(selector));
};
