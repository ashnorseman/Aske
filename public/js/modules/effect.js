/**
 * Created by Ash.Zhang on 2015/6/29.
 */


elementProto.show = function () {

  if (this.style.display === 'none') {
    this.style.display = '';
  }

  if (this.css('display') === 'none') {

    if (this.getAttribute('display')) {
      this.css('display', this.getAttribute('display'));
    }
  }
};

elementProto.hide = function () {
  var oldDisplay = this.css('display');

  if (oldDisplay !== 'none') this.setAttribute('display', oldDisplay);

  this.style.display = 'none';

  return this;
};