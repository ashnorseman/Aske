
// Event Spec
// ---------------------------


describe('Event', function () {

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

  it('Element.one()', function () {
    var spy = sinon.spy();

    document.body.one('click', spy);
    document.body.click();
    expect(spy).to.be.calledOnce;
    document.body.click();
    expect(spy).to.be.calledOnce;
  });

  it('Element.trigger()', function () {
    var spy = sinon.spy();

    document.body.on('click', spy);
    document.body.trigger('click');
    expect(spy).to.be.calledOnce;
    expect(spy).to.be.calledOn(document.body);
    expect(spy.firstCall.args[0].target).to.be.equal(document.body);

    document.body.trigger('click', { test: 'testing' });
    expect(spy.secondCall.args[0].target).to.be.equal(document.body);
    expect(spy.secondCall.args[0].data.test).to.be.equal('testing');
    expect(spy).to.be.calledTwice;

    document.body.off();
  });

  it('Element.triggerHandler()', function () {
    var spy = sinon.spy();

    document.body.on('click', spy);
    document.body.triggerHandler('click');
    expect(spy).to.be.calledOnce;
    expect(spy).to.be.calledOn(document.body);
    expect(spy.firstCall.args[0].target).to.be.equal(document.body);
    expect(spy.firstCall.args[0].eventName).to.be.equal('click');
    expect(spy.firstCall.args[0].eventType).to.be.equal('click');

    document.body.trigger('click', { test: 'testing' });
    expect(spy.secondCall.args[0].target).to.be.equal(document.body);
    expect(spy.secondCall.args[0].data.test).to.be.equal('testing');
    expect(spy).to.be.calledTwice;

    document.body.off();
  });

  it('Element.onBlur()', function () {
    var input = document.createElement('input'),
        spy = sinon.spy();

    document.body.appendChild(input);
    input.onBlur({ test: 'testing' }, spy);

    expect(spy).to.be.not.called;
    input.trigger('blur');
    expect(spy).to.be.calledOnce;
    expect(spy).to.be.calledOn(input);
    expect(spy.firstCall.args[0].data.test).to.be.equal('testing');

    document.body.removeChild(input);
  });

  it('Element.onChange()', function () {
    var input = document.createElement('input'),
        spy = sinon.spy();

    document.body.appendChild(input);
    input.onChange({ test: 'testing' }, spy);

    expect(spy).to.be.not.called;
    input.value = 'value';
    input.trigger('change');
    expect(spy).to.be.calledOnce;
    expect(spy).to.be.calledOn(input);
    expect(spy.firstCall.args[0].data.test).to.be.equal('testing');

    document.body.removeChild(input);
  });

  it('Element.onClick()', function () {
    var input = document.createElement('input'),
        spy = sinon.spy();

    document.body.appendChild(input);
    input.onClick({ test: 'testing' }, spy);

    expect(spy).to.be.not.called;
    input.click();
    expect(spy).to.be.calledOnce;
    expect(spy).to.be.calledOn(input);
    expect(spy.firstCall.args[0].data.test).to.be.equal('testing');

    document.body.removeChild(input);
  });
});
