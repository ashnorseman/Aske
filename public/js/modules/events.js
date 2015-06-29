/**
 * Created by AshZhang on 15/6/29.
 */


function addEvent(element, event, callback) {

  if (element.addEventListener) {
    element.addEventListener(event, callback, false);
  } else if (element.attachEvent) {
    element.attachEvent('on' + event, callback);
  }
};

function removeEvent(element, event, callback) {

  if (element.removeEventListener) {
    element.removeEventListener(event, callback, false);
  } else if (element.detachEvent) {
    element.detachEvent('on' + event, callback);
  }
};

elementProto.on = function (ev, selector, data, callback) {
  var packedCallback;

  if (typeof selector === 'function') {
    callback = selector;
    selector = '';
  }

  if (typeof data === 'function') {
    callback = data;
    data = null;
  }

  this._events || (this._events = {});
  this.__events || (this.__events = {});
  this._events[ev] || (this._events[ev] = {});
  this.__events[ev] || (this.__events[ev] = {});
  this._events[ev][selector] || (this._events[ev][selector] = []);
  this.__events[ev][selector] || (this.__events[ev][selector] = []);

  if (!this._events[ev][selector].contains(callback)) {
    packedCallback = function (e) {
      e || (e = event);
      data && (e.data = data);

      if (!selector || this.qsa(selector).contains(e.target || e.srcElement))
        return callback.call(e.target || e.srcElement, e);
    };

    addEvent(this, ev, packedCallback);

    this._events[ev][selector].push(packedCallback);
    this.__events[ev][selector].push(callback);
  }

  return this;
};

elementProto.off = function (ev, selector, callback) {
  var ev, sel;

  if (!this._events || !this.__events) return this;

  if (selector === void 0) {

    for (ev in this.__events) if (this.__events.hasOwnProperty(ev) && this.__events[ev]) {

      for (sel in this.__events[ev]) if (this.__events[ev].hasOwnProperty(sel) && this.__events[ev][sel]) {

        this.__events[ev][sel].forEach(function (cb, i) {
          removeEvent(this, ev, this._events[ev][sel][i]);
        }, this);
      }
    }

    this._events = {};
    this.__events = {};

    return this;
  }

  if (typeof selector === 'function') {
    callback = selector;
    selector = '';
  }

  if (!this.__events[ev] || !this.__events[ev][selector]) return this;

  this.__events[ev][selector].forEach(function (cb, i, arr) {

    if (!callback || callback === cb) {
      removeEvent(this, ev, this._events[ev][selector][i]);
      arr[i] = void 0;
      this._events[ev][selector][i] = void 0;
    }
  }, this);

  this._events[ev][selector] = this._events[ev][selector].pack();
  this.__events[ev][selector] = this.__events[ev][selector].pack();

  return this;
};