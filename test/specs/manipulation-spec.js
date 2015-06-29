/**
 * Created by AshZhang on 15/6/29.
 */


describe('Element', function () {

  it('Element.append()', function () {
    document.body.append('<div id="append-test"></div>');
    expect(document.body.getLastChild().id).to.be.equal('append-test');

    document.body.append(document.createElement('span'));
    expect(document.body.getLastChild().tagName.toUpperCase()).to.be.equal('SPAN');

    document.body.append(function (oldHTML) {
      return '<p>' + oldHTML.length + '</p>';
    });
    expect(+document.body.getLastChild().innerHTML).to.be.a('number');

    document.body.removeChild(document.body.getLastChild());
    document.body.removeChild(document.body.getLastChild());
    document.body.removeChild(document.body.getLastChild());
  });

  it('Element.appendTo()', function () {
    var div = document.createElement('div'),
        div2 = document.createElement('div');

    div.id = 'appendTo';
    div.appendTo(document.body);

    expect(document.getElementById('appendTo').parentNode).to.be.equal(document.body);
    expect(document.body.lastChild).to.be.equal(document.getElementById('appendTo'));

    div2.id = 'appendTo2';
    div2.appendTo('body');

    expect(document.getElementById('appendTo2').parentNode).to.be.equal(document.body);
    expect(document.body.lastChild).to.be.equal(document.getElementById('appendTo2'));

    document.body.removeChild(div);
    document.body.removeChild(div2);
  });

  it('Element.prepend()', function () {
    document.body.prepend('<div id="prepend-test"></div>');
    expect(document.body.getFirstChild().id).to.be.equal('prepend-test');

    document.body.prepend(document.createElement('span'));
    expect(document.body.getFirstChild().tagName.toUpperCase()).to.be.equal('SPAN');

    document.body.prepend(function (oldHTML) {
      return '<p>' + oldHTML.length + '</p>';
    });
    expect(+document.body.getFirstChild().innerHTML).to.be.a('number');

    document.body.removeChild(document.body.getFirstChild());
    document.body.removeChild(document.body.getFirstChild());
    document.body.removeChild(document.body.getFirstChild());
  });

  it('Element.appendTo()', function () {
    var div = document.createElement('div'),
        div2 = document.createElement('div');

    div.id = 'prependTo';
    div.prependTo(document.body);

    expect(document.getElementById('prependTo').parentNode).to.be.equal(document.body);
    expect(document.body.firstChild).to.be.equal(document.getElementById('prependTo'));

    div2.id = 'prependTo2';
    div2.prependTo('body');

    expect(document.getElementById('prependTo2').parentNode).to.be.equal(document.body);
    expect(document.body.firstChild).to.be.equal(document.getElementById('prependTo2'));

    document.body.removeChild(div);
    document.body.removeChild(div2);
  });

  it('Element.after()', function () {
    var last = document.body.getLastChild(),
        span = document.createElement('span');

    last.after('<div></div>1<span></span>');

    expect(last.nextSibling.tagName.toUpperCase()).to.be.equal('DIV');

    document.body.removeChild(last.nextSibling);
    document.body.removeChild(last.nextSibling);
    document.body.removeChild(last.nextSibling);

    last.after(span);

    expect(last.nextSibling.tagName.toUpperCase()).to.be.equal('SPAN');

    document.body.removeChild(span);

    last.after(function (oldHTMl) {
      return oldHTMl.length;
    });

    expect(+last.nextSibling.nodeValue).to.be.a('number');

    document.body.removeChild(last.nextSibling);
  });

  it('Element.before()', function () {
    var last = document.body.getLastChild(),
        span = document.createElement('span');

    last.after('<div></div>1<span></span>');

    expect(last.nextSibling.tagName.toUpperCase()).to.be.equal('DIV');

    document.body.removeChild(last.nextSibling);
    document.body.removeChild(last.nextSibling);
    document.body.removeChild(last.nextSibling);

    last.after(span);

    expect(last.nextSibling.tagName.toUpperCase()).to.be.equal('SPAN');

    document.body.removeChild(span);

    last.before(function (oldHTMl) {
      return oldHTMl.length;
    });

    expect(+last.previousSibling.nodeValue).to.be.a('number');

    document.body.removeChild(last.previousSibling);
  });

  it('Element.attachAfter()', function () {
    var div = document.createElement('div'),
        span = document.createElement('span');

    div.attachAfter(document.body.lastChild);
    expect(document.body.lastChild).to.be.equal(div);

    div.attachAfter(document.body.firstChild);
    expect(document.body.firstChild.nextSibling).to.be.equal(div);

    span.attachAfter('div');
    expect(div.nextSibling).to.be.equal(span);

    document.body.removeChild(div);
    document.body.removeChild(span);
  });

  it('Element.attachBefore()', function () {
    var div = document.createElement('div'),
        span = document.createElement('span');

    div.attachBefore(document.body.lastChild);
    expect(document.body.lastChild.previousSibling).to.be.equal(div);

    div.attachBefore(document.body.firstChild);
    expect(document.body.firstChild).to.be.equal(div);

    span.attachBefore('div');
    expect(document.body.firstChild).to.be.equal(span);

    document.body.removeChild(div);
    document.body.removeChild(span);
  });

  it('Element.wrap()', function () {
    var span = document.createElement('span');

    document.body.appendChild(span);

    span.wrap('<div id="wrap-test"></div>');
    expect(document.getElementById('wrap-test').firstChild).to.be.equal(span);

    span.wrap(document.body);
    expect(span.parentNode).to.be.equal(document.body);

    span.wrap(function () {
      return '<div id="' + this.tagName.toUpperCase() + '"></div>';
    });
    expect(span.parentNode).to.be.equal(document.getElementById('SPAN'));

    document.body.removeChild(document.getElementById('SPAN'));
    document.body.removeChild(document.getElementById('wrap-test'));
  });

  it('Element.wrapInner()', function () {
    var div = document.createElement('div'),
        span = document.createElement('span');

    div.innerHTML = 'content';
    document.body.appendChild(div);

    div.wrapInner('<span id="wrap-test"></span>');
    expect(document.getElementById('wrap-test').innerHTML).to.be.equal('content');
    expect(document.getElementById('wrap-test').parentNode).to.be.equal(div);

    div.wrapInner(span);
    expect(span.parentNode).to.be.equal(div);
    expect(document.getElementById('wrap-test').parentNode).to.be.equal(span);

    div.wrapInner(function () {
      return '<span id="' + this.tagName.toUpperCase() + '"></span>';
    });

    expect(document.getElementById('DIV').parentNode).to.be.equal(div);
    expect(span.parentNode).to.be.equal(document.getElementById('DIV'));

    document.body.removeChild(div);
  });

  it('Element.unwrap()', function () {
    var div = document.createElement('div'),
        span = document.createElement('span');

    div.appendChild(span);
    document.body.appendChild(div);

    span.unwrap();
    expect(span.parentNode).to.be.equal(document.body);
    expect(div.parentNode).to.be.equal(null);

    document.body.removeChild(span);
  });

  it('Element.replaceWidth()', function () {
    var old = document.createElement('div'),
        newSpan = document.createElement('span');

    newSpan.id = 'new-span';
    document.body.appendChild(old);

    old.replaceWith('<span></span>');
    expect(old.parentNode).to.be.equal(null);
    expect(document.body.lastChild.tagName.toUpperCase()).to.be.equal('SPAN');

    document.body.lastChild.replaceWith(newSpan);
    expect(document.body.lastChild.id).to.be.equal('new-span');

    document.body.lastChild.replaceWith(function () {
      return '<span id="' + this.tagName.toUpperCase() + '"></span>'
    });
    expect(document.body.lastChild.id).to.be.equal('SPAN');

    document.body.removeChild(document.getElementById('SPAN'));
  });

  it('Element.replaceAll()', function () {
    document.body.appendChild(document.createElement('span'));
    document.body.appendChild(document.createElement('span'));

    document.createElement('div').replaceAll('span');

    expect(document.qsa('span')).to.be.length(0);
    expect(document.qsa('div')).to.be.length(2);

    document.qsa('div').forEach(function (item) {
      document.body.removeChild(item);
    });
  });

  it('Element.empty()', function () {
    var div = document.createElement('div');

    div.innerHTML = 'content';
    div.empty();
    expect(div.innerHTML).to.be.equal('');
  });

  it('Element.remove()', function () {
    var div = document.createElement('div');

    div.id = 'remove';
    document.body.appendChild(div);
    expect(document.getElementById('remove')).to.be.ok;

    div.remove();
    expect(document.getElementById('remove')).to.be.not.ok;
  });

  it('Element.clone()', function () {
    var div = document.createElement('div');

    expect(div.clone().tagName.toUpperCase()).to.be.equal('DIV');

    div.innerHTML = '1<span></span>';
    expect(div.clone().innerHTML).to.be.equal('');
    expect(div.clone(true).innerHTML).to.be.equal('1<span></span>');
  });
});