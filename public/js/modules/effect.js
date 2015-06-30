
// Effect
// ---------------------------


elementProto.show = function () {
  var copy, defaultDisplay;

  if (this.style.display === 'none') {
    this.style.display = '';
  }

  if (this.css('display') === 'none') {
    copy = d.createElement(this.tagName);
    d.body.appendChild(copy);
    defaultDisplay = getComputedStyle(copy)['display'];
    this.style.display = (defaultDisplay === 'none') ? 'block' : defaultDisplay;
    d.body.removeChild(copy);
  }

  return this;
};

elementProto.hide = function () {
  this.style.display = 'none';

  return this;
};
