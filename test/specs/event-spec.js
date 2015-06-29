/**
 * Created by AshZhang on 15/6/29.
 */


describe('Element', function () {

  it('Element.on()', function () {
    var spy = sinon.spy(),
        spy2 = sinon.spy(),
        spy3 = sinon.spy(),
        div = document.createElement('div');

    document.body.on('click', spy);
    document.body.click();
    expect(spy).to.be.calledOnce;
    expect(spy).to.be.calledOn(document.body);

    document.body.appendChild(div);
    document.body.on('click', 'div', spy2);
    div.click();
    expect(spy2).to.be.calledOnce;
    expect(spy2).to.be.calledOn(div);
    expect(spy).to.be.calledTwice;

    div.on('click', null, { test: 'testing' }, spy3);
    div.click();
    expect(spy3.firstCall.args[0].data.test).to.be.equal('testing');

    document.body.removeChild(div);

    document.body.off();
  });

  it('Element.off()', function () {
    var spy = sinon.spy(),
        spy2 = sinon.spy(),
        spy3 = sinon.spy(),
        div = document.createElement('div');

    document.body.appendChild(div);
    document.body.on('click', 'div', spy);
    div.click();
    expect(spy).to.be.calledOnce;
    document.body.off('click', 'div', spy);
    div.click();
    expect(spy).to.be.calledOnce;

    document.body.on('click', spy2);
    div.click();
    expect(spy).to.be.calledOnce;
    expect(spy2).to.be.calledOnce;

    document.body.on('click', 'div', spy3);
    div.click();
    expect(spy3).to.be.calledOnce;
    document.body.off('click', 'div');
    expect(spy).to.be.calledOnce;
    expect(spy2).to.be.calledTwice;
    expect(spy3).to.be.calledOnce;

    document.body.off();
    div.click();
    expect(spy).to.be.calledOnce;
    expect(spy2).to.be.calledTwice;
    expect(spy3).to.be.calledOnce;

    document.body.removeChild(div);
  });
});