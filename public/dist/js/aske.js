(function (d) {
  'use strict';

  var arrayProto = Array.prototype,
      elementProto = Element.prototype,
      slice = arrayProto.slice;

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

/**
 * Created by AshZhang on 15/6/28.
 */



function addOneClass(el, className) {
  var newClass;

  if (el.hasClass(className)) return el;

  if (typeof className === 'function') {
    newClass = className.call(el, el.className);
  } else {
    newClass = (el.className + ' ' + className).trim();
  }

  el.className = newClass;
}

elementProto.attr = function (prop, value) {
  if (value === void 0) return this.getAttribute(prop);

  if (typeof value === 'function') {
    this.setAttribute(prop, value.call(this, this.getAttribute(prop)));
  } else {
    this.setAttribute(prop, value);
  }

  return this;
};

elementProto.prop = function (prop, value) {
  if (value === void 0) return this[prop];

  if (typeof value === 'function') {
    this[prop] = value.call(this, this[prop]);
  } else {
    this[prop] = value;
  }

  return this;
};

elementProto.removeProp = function (prop) {
  this[prop] = false;
  return this;
};

elementProto.hasClass = function (className) {
  var classReg = new RegExp('(?:^|\\s)' + className + '(?:\\s|$)');

  return classReg.test(this.className);
};

elementProto.addClass = function (className) {
  var classes = className.split(' ');

  classes.forEach(function (className) {
    addOneClass(this, className);
  }, this);

  return this;
};

elementProto.removeClass = function (className) {
  var classes = className.split(' ');

  classes.forEach(function (className) {
    this.className = this.className.replace(new RegExp('(?:^|\\s)' + className + '(?:\\s|$)'), '');
  }, this);

  return this;
};

elementProto.toggleClass = function (className, switcher) {

  if (switcher === void 0) {
    if (this.hasClass(className)) return this.removeClass(className);

    return this.addClass(className);
  }

  if (switcher === true) return this.addClass(className);

  if (switcher === false) return this.removeClass(className);

  if (typeof switcher === 'function') {
    if (switcher.call(this, this.className)) return this.addClass(className);

    return this.removeClass(className);
  }

  return this;
};

elementProto.html = function (str) {
  if (str === void 0) return this.innerHTML;

  this.innerHTML = str;

  return this;
};

elementProto.text = function (str) {

  if (str === void 0) {
    if (this.textContent !== '') return this.textContent;

    return this.innerText;
  }

  if (this.textContent !== '') {
    this.textContent = str;
  } else {
    this.innerText = str;
  }

  return this;
};

elementProto.val = function (value) {
  var selected;

  if (value === void 0) {
    if (this.tagName.toUpperCase() !== 'SELECT' || this.type === 'select-one') return this.value;

    if (this.type === 'select-multiple') {
      selected = [];

      this.qsa('option').forEach(function (option) {
        if (option.selected) selected.push((option.value !== void 0) ? option.value : option.text);
      });

      return selected;
    }
  }

  if (typeof value === 'function') value = value.call(this, this.val());

  if (this.tagName.toUpperCase() !== 'SELECT' || this.type === 'select-one') {
    this.value = value;
  } else if (this.type = 'select-multiple') {

    if (Array.isArray(value)) {
      this.qsa('option').forEach(function (option) {
        option.selected = value.contains(option.value)
            || (option.value === void 0 && value.contains(option.text));
      });
    } else {
      this.qsa('option').forEach(function (option) {
        option.selected = option.value === value
            || (option.value === void 0 && option.text === value);
      });
    }
  }

  return this;
};

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

/**
 * Created by AshZhang on 15/6/28.
 */


HTMLDocument.prototype.qs = function (selector) {
  return this.querySelector(selector);
};

HTMLDocument.prototype.qsa = function (selector) {
  return Array.prototype.slice.call(this.querySelectorAll(selector));
};

/**
 * Created by AshZhang on 15/6/29.
 */


elementProto.append = function (item) {

  switch (typeof item) {
  case 'string':
    this.innerHTML += item;
    break;
  case 'function':
    this.innerHTML += item.call(this, this.innerHTML);
    break;
  default:
    this.appendChild(item);
  }

  return this;
};

elementProto.prepend = function (item) {

  switch (typeof item) {
  case 'string':
    this.innerHTML = item + this.innerHTML;
    break;
  case 'function':
    this.innerHTML = item.call(this, this.innerHTML) + this.innerHTML;
    break;
  default:
    this.insertBefore(item, this.firstChild);
  }

  return this;
};

elementProto.appendTo = function (target) {

  if (typeof target === 'string') {
    target = d.qs(target);
  }

  target.appendChild(this);

  return this;
};

elementProto.prependTo = function (target) {

  if (typeof target === 'string') {
    target = d.qs(target);
  }

  target.insertBefore(this, target.firstChild);

  return this;
};

elementProto.after = function (item) {

  switch (typeof item) {
  case 'string':
    this.insertAdjacentHTML('afterEnd', item);
    break;
  case 'function':
    this.insertAdjacentHTML('afterEnd', item.call(this, this.innerHTML));
    break;
  default:
    this.parentNode.insertBefore(item, this.nextSibling);
  }

  return this;
};

elementProto.before = function (item) {


  switch (typeof item) {
  case 'string':
    this.insertAdjacentHTML('beforeBegin', item);
    break;
  case 'function':
    this.insertAdjacentHTML('beforeBegin', item.call(this, this.innerHTML));
    break;
  default:
    this.parentNode.insertBefore(item, this);
  }

  return this;
};

elementProto.attachAfter = function (item) {
  if (typeof item === 'string') item = d.qs(item);

  item.parentNode.insertBefore(this, item.nextSibling);

  return this;
};

elementProto.attachBefore = function (item) {
  if (typeof item === 'string') item = d.qs(item);

  item.parentNode.insertBefore(this, item);

  return this;
};

elementProto.wrap = function (wrapper) {
  var wrap;

  if (typeof wrapper === 'function') wrapper = wrapper.call(this);

  if (typeof wrapper === 'string') {
    wrap = d.createElement('div');
    wrap.innerHTML = wrapper;
    wrap = wrap.getFirstChild();
    this.parentNode.replaceChild(wrap, this);
    wrap.appendChild(this);
  } else {
    wrapper.appendChild(this);
  }

  return this;
};

elementProto.wrapInner = function (wrapper) {
  var wrap, node;

  if (typeof wrapper === 'function') wrapper = wrapper.call(this);

  if (typeof wrapper === 'string') {
    wrap = d.createElement('div');
    wrap.innerHTML = wrapper;
    wrapper = wrap.getFirstChild();
  }

  node = this.firstChild;

  while (node) {
    wrapper.appendChild(node);
    node = node.nextSibling;
  }

  this.appendChild(wrapper);

  return this;
};

elementProto.unwrap = function () {
  var parent = this.parentNode;

  parent.parentNode.replaceChild(this, parent);

  return this;
};

elementProto.replaceWith = function (content) {
  var div, node;

  if (typeof content === 'function') content = content.call(this);

  if (typeof content === 'string') {
    div = d.createElement('div');
    div.innerHTML = content;
    node = this;

    while (div.firstChild) {
      node.after(div.firstChild);
    }

    this.parentNode.removeChild(this);
  } else {
    this.parentNode.replaceChild(content, this);
  }

  return this;
};

elementProto.replaceAll = function (selector) {
  var qsResult = d.qsa(selector);

  qsResult.forEach(function (item) {
    item.replaceWith(this.cloneNode(true));
  }, this);

  return this;
};

elementProto.empty = function () {
  this.innerHTML = '';

  return this;
};

elementProto.remove = function () {
  this.parentNode.removeChild(this);

  return this;
};

elementProto.clone = function (deep) {
  return this.cloneNode(deep);
};
/**
 * Created by AshZhang on 15/6/28.
 */


String.prototype.trim = function () {
  return this.replace(/^\s+/, '').replace(/\s+$/, '');
};

/**
 * Created by AshZhang on 15/6/27.
 */


function getElementChildren(node) {
  var childNodes = node.childNodes,
      len = childNodes.length,
      children = [],
      i;

  for (i = 0; i < len; i += 1) {
    if (childNodes[i].nodeType === 1) children.push(childNodes[i]);
  }

  return children;
}

function previousElementSibling(node) {
  if (node.previousElementSibling) return node.previousElementSibling;

  do {
    node = node.previousSibling;
  } while (node && node.nodeType !== 1);

  return node;
}

function nextElementSibling(node) {
  if (node.nextElementSibling) return node.nextElementSibling;

  do {
    node = node.nextSibling;
  } while (node && node.nodeType !== 1);

  return node;
}

elementProto.qs = function (selector) {
  return this.querySelector(selector);
};

elementProto.qsa = function (selector) {
  return Array.prototype.slice.call(this.querySelectorAll(selector));
};

elementProto.closest = function (arg) {
  var qsResult,
      node = this;

  if (typeof arg === 'string') {
    qsResult = d.qsa(arg);
  } else {
    qsResult = [arg];
  }

  while (node) {
    if (qsResult.contains(node)) return node;
    node = node.parentNode;
  }

  return null;
};

elementProto.contents = function () {
  return slice.call(this.childNodes);
};

elementProto.find = function (arg) {
  var qsResult, len, i;

  if (typeof arg === 'string') {
    return d.qsa(arg);
  } else {
    qsResult = this.querySelectorAll('*');
    len = qsResult.length;

    for (i = 0; i < len; i += 1) {
      if (qsResult[i] === arg) return arg;
    }
  }

  return null;
};

elementProto.getChildren = function (selector) {
  var elementChildren = getElementChildren(this),
      qsResult, len, i, children;

  if (selector === void 0) return elementChildren;

  qsResult = d.querySelectorAll(selector);
  len = qsResult.length;
  children = [];

  for (i = 0; i < len; i += 1) {
    if (elementChildren.contains(qsResult[i])) children.push(qsResult[i]);
  }

  return children;
};

elementProto.getFirstChild = function () {
  var node;

  if (this.firstElementChild) return this.firstElementChild;

  node = this.firstChild;

  while (node && node.nodeType !== 1) {
    node = node.nextSibling;
  }

  if (node.nodeType === 1) return node;

  return null;
};

elementProto.getLastChild = function () {
  var node;

  if (this.lastElementChild) return this.lastElementChild;

  node = this.lastChild;

  while (node && node.nodeType !== 1) {
    node = node.previousSibling;
  }

  if (node.nodeType === 1) return node;

  return null;
};

elementProto.is = function (arg) {
  var qsResult, len, i;

  if (typeof arg === 'string') {
    qsResult = d.querySelectorAll(arg);
    len = qsResult.length;

    for (i = 0; i < len; i += 1) {
      if (qsResult[i] === this) return true;
    }

    return false;
  } else if (typeof arg === 'object') {
    return arg === this;
  } else if (typeof arg === 'function') {
    return !!arg.call(this);
  }
};

elementProto.next = function (selector) {
  var qsResult,
      sibling = this;

  if (selector === void 0) {
    return nextElementSibling(sibling);
  } else {
    qsResult = this.parentNode.qsa(selector);

    do {
      sibling = nextElementSibling(sibling);

      if (qsResult.contains(sibling)) return sibling;
    } while (sibling);
  }

  return null;
};

elementProto.prev = function (selector) {
  var qsResult,
      sibling = this;

  if (selector === void 0) {
    return previousElementSibling(sibling);
  } else {
    qsResult = this.parentNode.qsa(selector);

    do {
      sibling = previousElementSibling(sibling);

      if (qsResult.contains(sibling)) return sibling;
    } while (sibling);
  }

  return null;
};

elementProto.nextAll = function (selector) {
  var siblings = [],
      sibling = this;

  while (sibling = sibling.next(selector)) {
    siblings.push(sibling);
  }

  return siblings;
};

elementProto.prevAll = function (selector) {
  var siblings = [],
      sibling = this;

  while (sibling = sibling.prev(selector)) {
    siblings.unshift(sibling);
  }

  return siblings;
};

elementProto.nextUntil = function (until, selector) {
  var siblings = [],
      sibling = this;

  if (typeof until === 'string') until = this.parentNode.querySelector(until);

  while ((sibling = sibling.next(selector)) && sibling !== until) {
    siblings.push(sibling);
  }

  return siblings;
};

elementProto.prevUntil = function (until, selector) {
  var siblings = [],
      sibling = this;

  if (typeof until === 'string') until = this.parentNode.querySelector(until);

  while ((sibling = sibling.prev(selector)) && sibling !== until) {
    siblings.unshift(sibling);
  }

  return siblings;
};

elementProto.parent = function (selector) {
  var parent = this.parentNode;

  if (selector === void 0 && parent.nodeType === 1) return parent;

  if (parent.parentNode
      && parent.parentNode.qsa(selector).contains(parent)
      && parent.nodeType === 1) return parent;

  return null;
};

elementProto.parents = function (selector) {
  var parents = [],
      parent = this,
      qsResult;

  if (selector !== void 0) qsResult = d.qsa(selector);

  while ((parent = parent.parentNode) && parent.nodeType === 1) {
    if (selector === void 0 || qsResult.contains(parent)) parents.push(parent);
  }

  return parents;
};

elementProto.parentsUntil = function (until, selector) {
  var parents = [],
      parent = this,
      qsResult;

  if (typeof until === 'string') {
    until = d.qsa(until);
  } else {
    until = [until];
  }

  if (selector !== void 0) qsResult = d.qsa(selector);

  while (parent = parent.parentNode) {

    if (!until.contains(parent)) {
      if (!qsResult || (qsResult && qsResult.contains(parent))) parents.push(parent);
    } else {
      return parents;
    }
  }

  return parents;
};

elementProto.siblings = function (selector) {
  return this.prevAll(selector).concat(this.nextAll(selector));
};

}(document));
