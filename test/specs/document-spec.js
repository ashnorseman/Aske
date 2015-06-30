
// Document Spec
// ---------------------------


describe('Document', function () {

  it('Document.qs()', function () {
    expect(document.qs('head')).to.be.equal(document.querySelector('head'));
    expect(document.qs('body')).to.be.equal(document.body);
  });

  it('Document.qsa()', function () {
    expect(document.qsa('head')[0]).to.be.equal(document.querySelector('head'));
    expect(document.qsa('body')[0]).to.be.equal(document.body);
  });

  it('Document.ready()', function () {
    var spy = sinon.spy();

    document.ready(spy);

    expect(spy).to.be.calledOnce;
    expect(spy).to.be.calledOn(document);
  });
});