/**
 * Created by AshZhang on 15/6/28.
 */


String.prototype.trim = function () {
  return this.replace(/^\s+/, '').replace(/\s+$/, '');
};
