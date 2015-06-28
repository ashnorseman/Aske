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
});