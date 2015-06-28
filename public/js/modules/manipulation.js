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