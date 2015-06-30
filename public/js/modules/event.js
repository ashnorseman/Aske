
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

function Event(e, el, delegateEl, data) {
  e || (e = {});
  data && (e.data = data);

  e.currentTarget = el;
  e.delegateEl = delegateEl;

  if (e.x !== void 0) {
    e.pageX = e.x;
    e.pageY = e.y;
  }

  if (e.keyCode !== void 0) {
    e.which = e.keyCode;
  } else if (e.charCode !== void 0) {
    e.which = e.charCode;
  } else if (e.button !== void 0) {
    e.which = (e.button & 1 ? 1 : (e.button & 2 ? 3 : (e.button & 4 ? 2 : 0)));
  }

  if (!e.target) e.target = (e.srcElement ? e.srcElement : el);

  e.prototype = Event.prototype;

  if (e.timeStamp === void 0) e.timeStamp = new Date().valueOf();

  return e;
}

Event.prototype.extend({

  isDefaultPrevented: function () {
    if (this.cancelable !== void 0) return this.cancelable;

    return !this.returnValue;
  },

  isPropagationStopped: function () {
    if (this.bubbles !== void 0) return !this.bubbles;

    return this.cancelBubble;
  },

  preventDefault: function () {
    if (this.preventDefault) return this.preventDefault();

    this.returnValue = false;
  },

  stopPropagation: function () {
    if (this.stopPropagation) return this.stopPropagation();

    this.cancelBubble = true;
  }
});

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

      if (!selector || this.qsa(selector).contains(e.target)) {
        e = new Event(e, e.target, this, data);
        return callback.call(e.target, e);
      }
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

  event = new Event(event, this, this, data);

  if (this.dispatchEvent) {
    this.dispatchEvent(event);
  } else if (this.fireEvent){
    this.fireEvent('on' + ev, event);
  }

  return this;
};

elementProto.triggerHandler = function (ev, data) {

  if (this._events && this._events[ev] && this._events[ev]['']) {
    this._events[ev][''].forEach(function (cb) {
      cb.call(this, new Event({ type: ev }, this, this, data));
    }, this);
  }

  return this;
};

function eventListener(ev) {

  return function (data, cb) {
    if (!arguments.length) return this.trigger(ev);

    return this.on(ev, '', data, cb);
  }
}

elementProto.onBlur = eventListener('blur');
elementProto.onClick = eventListener('click');
elementProto.onChange = eventListener('change');
elementProto.onDblClick = eventListener('dblclick');
elementProto.onError = eventListener('error');
elementProto.onFocus = eventListener('focus');
elementProto.onFocusIn = eventListener('focusin');
elementProto.onFocusOut = eventListener('focusout');
elementProto.onKeyDown = eventListener('keydown');
elementProto.onKeyPress = eventListener('keypress');
elementProto.onKeyUp = eventListener('keyup');
elementProto.onMouseDown = eventListener('mousedown');
elementProto.onMouseEnter = eventListener('mouseenter');
elementProto.onMouseLeave = eventListener('mouseleave');
elementProto.onMouseMove = eventListener('mousemove');
elementProto.onMouseOut = eventListener('mouseout');
elementProto.onMouseOver = eventListener('mouseover');
elementProto.onMouseUp = eventListener('mouseup');
elementProto.onLoad = eventListener('load');
elementProto.onSelect = eventListener('select');
elementProto.onSubmit = eventListener('submit');

window.on = elementProto.on;
window.off = elementProto.off;
window.trigger = elementProto.trigger;
window.one = elementProto.one;
window.onLoad = elementProto.onLoad;
window.onResize = eventListener('resize');
window.onUnload = eventListener('unload');
