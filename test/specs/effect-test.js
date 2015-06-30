
// Effect Spec
// ---------------------------


describe('Effect', function () {

  it('Element.show()', function () {
    var div = document.createElement('div'),
        span = document.createElement('span'),
        button = document.createElement('button'),
        style = document.createElement('style');

    style.innerHTML = 'div,span{display:none;}';
    document.qs('head').appendChild(style);
    document.body.appendChild(div);
    document.body.appendChild(span);
    document.body.appendChild(button);

    div.style.display = 'none';
    div.show();
    expect(div.css('display')).to.be.equal('block');

    span.show();
    expect(span.css('display')).to.be.equal('block');

    button.style.display = 'none';
    button.show();
    expect(button.css('display')).to.be.equal('inline-block');

    document.body.removeChild(div);
    document.body.removeChild(span);
    document.body.removeChild(button);
    document.qs('head').removeChild(style);
  });

  it('Element.hide()', function () {
    var div = document.createElement('div');

    document.body.appendChild(div);

    div.hide();
    expect(div.css('display')).to.be.equal('none');

    document.body.removeChild(div);
  });
});