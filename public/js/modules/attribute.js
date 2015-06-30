
// Attribute
// ---------------------------


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
