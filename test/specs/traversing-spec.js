/**
 * Created by AshZhang on 15/6/27.
 */


describe('Traversing', function () {

  it('Element.closest()', function () {
    expect(document.body.closest('html')).to.be.equal(document.qs('html'));
    expect(document.body.closest(document.qs('html'))).to.be.equal(document.qs('html'));
  });

  it('Element.contents()', function () {
    var div = document.createElement('div');

    div.innerHTML = '0<span></span>1<a></a>2<b></b>3';
    document.body.appendChild(div);

    expect(div.contents()).to.be.length(7);
    expect(div.contents()[0].nodeType).to.be.equal(3);
    expect(div.contents()[1].nodeType).to.be.equal(1);
    expect(div.contents()[6].nodeType).to.be.equal(3);

    document.body.removeChild(div);
  });

  it('Element.find()', function () {
    expect(document.qs('html').find('head')[0].tagName.toUpperCase()).to.be.equal('HEAD');
    expect(document.qs('html').find('title')[0].tagName.toUpperCase()).to.be.equal('TITLE');
    expect(document.qs('html').find(document.body)).to.be.equal(document.body);
  });

  it('Element.getChildren()', function () {
    var div = document.createElement('div');

    div.id = 'children-test';
    document.body.appendChild(div);

    expect(document.qs('html').getChildren()[0].tagName.toLocaleUpperCase()).to.be.equal('HEAD');
    expect(document.qs('html').getChildren()[1]).to.be.equal(document.body);

    expect(document.body.getChildren('#children-test')).to.be.length(1);
    expect(document.body.getChildren('#children-test')[0]).to.be.equal(div);

    document.body.removeChild(div);
  });

  it('Element.getFirstChild()', function () {
    var div = document.createElement('div');

    div.id = 'children-test';
    document.body.insertBefore(div, document.body.firstChild);

    expect(document.qs('html').getFirstChild().tagName.toLocaleUpperCase()).to.be.equal('HEAD');
    expect(document.body.getFirstChild()).to.be.equal(div);

    document.body.removeChild(div);
  });

  it('Element.getLastChild()', function () {
    var div = document.createElement('div');

    div.id = 'children-test';
    document.body.appendChild(div);

    expect(document.qs('html').getLastChild().tagName.toLocaleUpperCase()).to.be.equal('BODY');
    expect(document.body.getLastChild()).to.be.equal(div);

    document.body.removeChild(div);
  });

  it('Element.is()', function () {
    expect(document.body.is('body')).to.be.ok;
    expect(document.body.is('form')).to.be.not.ok;
    expect(document.body.is(document.body)).to.be.ok;
    expect(document.body.is(document.documentElement)).to.be.not.ok;
    expect(document.body.is(function () {
      return this.tagName.toUpperCase() === 'BODY';
    })).to.be.ok;
    expect(document.body.is(function () {
      return this.tagName.toUpperCase() === 'body';
    })).to.be.not.ok;
  });

  it('Element.next()', function () {
    var div = document.createElement('div');

    expect(document.qs('head').next()).to.be.equal(document.body);
    expect(document.qs('head').next('body')).to.be.equal(document.body);
    expect(document.body.next()).to.be.equal(null);

    div.innerHTML = '<span></span>1<a></a>2';
    document.body.appendChild(div);

    expect(div.qs('span').next('a').tagName.toUpperCase()).to.be.equal('A');
    expect(div.qs('a').next()).to.be.equal(null);

    document.body.removeChild(div);
  });

  it('Element.prev()', function () {
    var div = document.createElement('div');

    expect(document.qs('body').prev()).to.be.equal(document.qs('head'));
    expect(document.qs('body').prev('head')).to.be.equal(document.qs('head'));
    expect(document.qs('head').prev()).to.be.equal(null);

    div.innerHTML = '<span></span>1<a></a>2';
    document.body.appendChild(div);

    expect(div.qs('a').prev('span').tagName.toUpperCase()).to.be.equal('SPAN');
    expect(div.qs('span').prev()).to.be.equal(null);

    document.body.removeChild(div);
  });

  it('Element.nextAll()', function () {
    var div = document.createElement('div');

    div.innerHTML = '<span></span><a></a><a></a><span></span>1';
    document.body.appendChild(div);

    expect(div.childNodes[0].nextAll()).to.be.length(3);
    expect(div.childNodes[0].nextAll()[2].tagName.toUpperCase()).to.be.equal('SPAN');
    expect(div.childNodes[0].nextAll('a')).to.be.length(2);
    expect(div.childNodes[0].nextAll('a')[0].tagName.toUpperCase()).to.be.equal('A');
    expect(div.childNodes[0].nextAll('a')[1].tagName.toUpperCase()).to.be.equal('A');

    document.body.removeChild(div);
  });

  it('Element.prevAll()', function () {
    var div = document.createElement('div');

    div.innerHTML = '<span></span><a></a><a></a><span></span>1';
    document.body.appendChild(div);

    expect(div.childNodes[3].prevAll()).to.be.length(3);
    expect(div.childNodes[3].prevAll()[2].tagName.toUpperCase()).to.be.equal('A');
    expect(div.childNodes[3].prevAll('a')).to.be.length(2);
    expect(div.childNodes[3].prevAll('a')[0].tagName.toUpperCase()).to.be.equal('A');
    expect(div.childNodes[3].prevAll('a')[1].tagName.toUpperCase()).to.be.equal('A');

    document.body.removeChild(div);
  });

  it('Element.nextUntil()', function () {
    var div = document.createElement('div');

    div.innerHTML = '<span></span><a></a><b></b><i></i>1';
    document.body.appendChild(div);

    expect(div.childNodes[0].nextUntil(div.childNodes[3])).to.be.length(2);
    expect(div.childNodes[0].nextUntil(div.childNodes[3])[1].tagName.toUpperCase()).to.be.equal('B');
    expect(div.childNodes[0].nextUntil('i')).to.be.length(2);
    expect(div.childNodes[0].nextUntil('i')[0].tagName.toUpperCase()).to.be.equal('A');
    expect(div.childNodes[0].nextUntil('i')[1].tagName.toUpperCase()).to.be.equal('B');

    document.body.removeChild(div);
  });

  it('Element.prevUntil()', function () {
    var div = document.createElement('div');

    div.innerHTML = '<span></span><a></a><b></b><i></i>1';
    document.body.appendChild(div);

    expect(div.childNodes[3].prevUntil(div.childNodes[0])).to.be.length(2);
    expect(div.childNodes[3].prevUntil(div.childNodes[0])[1].tagName.toUpperCase()).to.be.equal('B');
    expect(div.childNodes[3].prevUntil('span')).to.be.length(2);
    expect(div.childNodes[3].prevUntil('span')[0].tagName.toUpperCase()).to.be.equal('A');
    expect(div.childNodes[3].prevUntil('span')[1].tagName.toUpperCase()).to.be.equal('B');

    document.body.removeChild(div);
  });

  it('Element.parent()', function () {
    expect(document.body.parent('html')).to.be.equal(document.qs('html'));
    expect(document.body.parent('head')).to.be.a('null');
    expect(document.qs('html').parent()).to.be.a('null');
  });

  it('Element.parents()', function () {
    var div = document.createElement('div');

    div.innerHTML = '<div><div><div id="parent-test"></div></div></div>';
    document.body.appendChild(div);

    expect(document.getElementById('parent-test').parents('div')).to.be.length(3);
    expect(document.getElementById('parent-test').parents()).to.be.length(5);
    expect(document.getElementById('parent-test').parents('body')[0]).to.be.equal(document.body);
    expect(document.body.parents()).to.be.length(1);
    expect(document.body.parents()[0]).to.be.equal(document.qs('html'));
    expect(document.qs('html').parents()).to.be.length(0);

    document.body.removeChild(div);
  });

  it('Element.parentsUntil()', function () {
    var div = document.createElement('div');

    div.innerHTML = '<div class="parent-test-div"><div><div id="parent-test"></div></div></div>';
    document.body.appendChild(div);

    expect(document.getElementById('parent-test').parentsUntil('body')).to.be.length(3);
    expect(document.getElementById('parent-test').parentsUntil(div)).to.be.length(2);
    expect(document.getElementById('parent-test').parentsUntil(div, '.parent-test-div')).to.be.length(1);
    expect(document.body.parentsUntil('html')).to.be.length(0);

    document.body.removeChild(div);
  });

  it('Element.siblings()', function () {
    var div = document.createElement('div');

    div.innerHTML = '<span></span><a></a><a></a><i></i>';
    document.body.appendChild(div);

    expect(document.body.siblings()).to.be.length(1);
    expect(document.body.siblings('body')).to.be.length(0);
    expect(div.qs('a').siblings()).to.be.length(3);
    expect(div.qs('a').siblings()[0].tagName.toUpperCase()).to.be.equal('SPAN');
    expect(div.qs('a').siblings('span')).to.be.length(1);

    document.body.removeChild(div);
  });
});