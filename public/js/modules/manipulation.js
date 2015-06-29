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