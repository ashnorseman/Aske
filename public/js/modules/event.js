
// Event
// ---------------------------


function addEvent(element, event, callback) {

  if (element.addEventListener) {
    element.addEventListener(event, callback, false);
  } else if (element.attachEvent) {
    element.attachEvent('on' + event, callback);
  }
}

function removeEvent(element, event, callback) {

  if (element.removeEventListener) {
    element.removeEventListener(event, callback, false);
  } else if (element.detachEvent) {
    element.detachEvent('on' + event, callback);
  }
}

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
  var sel;

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

elementProto.one = function (ev, selector, data, callback) {
  var packedCallback;

  if (typeof selector === 'function') {
    callback = selector;
    selector = '';
  }

  if (typeof data === 'function') {
    callback = data;
    data = null;
  }

  packedCallback = function packedCallback() {
    callback.apply(this, arguments);
    this.off(ev, selector, packedCallback);
  };

  this.on(ev, selector, data, packedCallback);

  return this;
};

elementProto.trigger = function (ev, data) {
  var event;

  if (typeof CustomEvent === 'function') {
    event = new CustomEvent(ev);
  } else if (d.createEventObject) {
    event = d.createEventObject();
  } else {
    return this;
  }

  event.target = this;
  event.eventType = ev;
  event.eventName = ev;
  event.extend(data);

  if (this.dispatchEvent) {
    this.dispatchEvent(event);
  } else if (this.fireEvent){
    this.fireEvent('on' + ev, event);
  }

  return this;
};
