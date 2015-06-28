/**
 * Created by AshZhang on 15/6/28.
 */



elementProto.css = function (prop, value) {
  var p;

  if (typeof prop === 'object') {

    for (p in prop) if (prop.hasOwnProperty(p)) {
      this.style[p] = prop[p];
    }

    return this;
  }

  if (value === void 0) {
    if (getComputedStyle) return getComputedStyle(this)[prop];
    if (this.currentStyle) return this.currentStyle[prop];
  } else {

    if (typeof value === 'function') {
      this.style[prop] = value.call(this, this.css(prop));
    } else {
      this.style[prop] = value;
    }

    return this;
  }
};

elementProto.offset = function () {
  var rect = this.getBoundingClientRect();

  return {
    top: rect.top + (window.pageYOffset === void 0 ? document.documentElement.scrollTop : window.pageYOffset),
    left: rect.left + (window.pageXOffset === void 0 ? document.documentElement.scrollLeft : window.pageXOffset)
  };
};

elementProto.position = function () {
  var op = this.offsetParent,
      offset = this.offset(),
      opOffset;

  if (op === null) return offset;

  opOffset = op.offset();

  return {
    top: offset.top - opOffset.top,
    left: offset.left - opOffset.left
  };
};

elementProto.height = function (value) {

  if (value === void 0) {
    return this.offsetHeight
        - parseInt(this.css('borderTopWidth'), 10)
        - parseInt(this.css('borderBottomWidth'), 10)
        - parseInt(this.css('paddingTop'), 10)
        - parseInt(this.css('paddingBottom'), 10);
  }

  if (typeof value === 'function') value = value.call(this, this.height());

  this.style.height = (typeof value === 'number') ? (value + 'px') : value;

  return this;
};

elementProto.width = function (value) {

  if (value === void 0) {
    return this.offsetWidth
        - parseInt(this.css('borderLeftWidth'), 10)
        - parseInt(this.css('borderRightWidth'), 10)
        - parseInt(this.css('paddingLeft'), 10)
        - parseInt(this.css('paddingRight'), 10);
  }

  if (typeof value === 'function') value = value.call(this, this.width());

  this.style.width = (typeof value === 'number') ? (value + 'px') : value;

  return this;
};

elementProto.innerHeight = function () {

  return this.offsetHeight
      - parseInt(this.css('borderTopWidth'), 10)
      - parseInt(this.css('borderBottomWidth'), 10);
};

elementProto.innerWidth = function () {

  return this.offsetWidth
      - parseInt(this.css('borderLeftWidth'), 10)
      - parseInt(this.css('borderRightWidth'), 10);
};

elementProto.outerHeight = function (hasMargin) {

  return this.offsetHeight
      + (hasMargin ? parseInt(this.css('marginTop'), 10) : 0)
      + (hasMargin ? parseInt(this.css('marginBottom'), 10) : 0);
};

elementProto.outerWidth = function (hasMargin) {

  return this.offsetWidth
      + (hasMargin ? parseInt(this.css('marginLeft'), 10) : 0)
      + (hasMargin ? parseInt(this.css('marginRight'), 10) : 0);
};
