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
