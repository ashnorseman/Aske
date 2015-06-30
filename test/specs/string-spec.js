
// String Spec
// ---------------------------


describe('String', function () {

  it('trim()', function () {
    expect('  abc  '.trim()).to.be.equal('abc');
    expect('  abc'.trim()).to.be.equal('abc');
    expect('abc   '.trim()).to.be.equal('abc');
  });
});