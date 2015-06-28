/**
 * Created by AshZhang on 15/6/28.
 */


describe('Element', function () {


  it('Element.css()', function () {
    document.body.style.position = 'relative';

    expect(document.body.css('position')).to.be.equal('relative');

    document.body.css('position', 'absolute');
    expect(document.body.css('position')).to.be.equal('absolute');

    document.body.css({
      position: 'relative',
      visibility: 'hidden'
    });
    expect(document.body.css('position')).to.be.equal('relative');
    expect(document.body.css('visibility')).to.be.equal('hidden');

    document.body.css('position', function (oldProp) {
      return 'static';
    });
    expect(document.body.css('position')).to.be.equal('static');

    document.body.style.position = '';
    document.body.style.visibility = '';
  });

  it('Element.offset()', function () {
    var div = document.createElement('div');

    div.style.position = 'absolute';
    div.style.top = '100px';
    div.style.left = '200px';

    document.body.appendChild(div);

    expect(div.offset().top).to.be.equal(100);
    expect(div.offset().left).to.be.equal(200);

    document.body.removeChild(div);
  });

  it('Element.position()', function () {
    var div = document.createElement('div'),
        inner = document.createElement('div');

    div.style.position = 'absolute';
    div.style.top = '100px';
    div.style.left = '200px';

    document.body.appendChild(div);
    document.body.style.margin = '0';

    expect(div.position().top).to.be.equal(100);
    expect(div.position().left).to.be.equal(200);

    inner.style.position = 'absolute';
    inner.style.top = '20px';
    inner.style.left = '40px';
    div.appendChild(inner);

    expect(inner.position().top).to.be.equal(20);
    expect(inner.position().left).to.be.equal(40);

    inner.style.position = 'static';
    inner.style.margin = '50px 0 0 100px';

    expect(inner.position().top).to.be.equal(50);
    expect(inner.position().left).to.be.equal(100);

    document.body.removeChild(div);
  });

  it('Element.height()', function () {
    var div = document.createElement('div');

    div.css({
      height: '100px',
      padding: '10px',
      border: '5px solid'
    });

    document.body.appendChild(div);

    expect(div.height()).to.be.equal(100);

    div.height(200);
    expect(div.style.height).to.be.equal('200px');

    div.height(function (oldHeight) {
      return oldHeight * 2;
    });
    expect(div.style.height).to.be.equal('400px');

    document.body.removeChild(div);
  });

  it('Element.width()', function () {
    var div = document.createElement('div');

    div.css({
      width: '500px',
      padding: '10px',
      border: '5px solid'
    });

    document.body.appendChild(div);

    expect(div.width()).to.be.equal(500);

    div.width(200);
    expect(div.style.width).to.be.equal('200px');

    document.body.removeChild(div);
  });

  it('Element.innerHeight()', function () {
    var div = document.createElement('div');

    div.css({
      height: '500px',
      padding: '10px',
      border: '5px solid'
    });

    document.body.appendChild(div);

    expect(div.innerHeight()).to.be.equal(520);

    document.body.removeChild(div);
  });

  it('Element.innerWidth()', function () {
    var div = document.createElement('div');

    div.css({
      width: '500px',
      padding: '10px',
      border: '5px solid'
    });

    document.body.appendChild(div);

    expect(div.innerWidth()).to.be.equal(520);

    document.body.removeChild(div);
  });

  it('Element.outerHeight()', function () {
    var div = document.createElement('div');

    div.css({
      height: '500px',
      padding: '10px',
      border: '5px solid',
      margin: '20px'
    });

    document.body.appendChild(div);

    expect(div.outerHeight()).to.be.equal(530);
    expect(div.outerHeight(true)).to.be.equal(570);

    document.body.removeChild(div);
  });

  it('Element.outerWidth()', function () {
    var div = document.createElement('div');

    div.css({
      width: '500px',
      padding: '10px',
      border: '5px solid',
      margin: '20px'
    });

    document.body.appendChild(div);

    expect(div.outerWidth()).to.be.equal(530);
    expect(div.outerWidth(true)).to.be.equal(570);

    document.body.removeChild(div);
  });
});