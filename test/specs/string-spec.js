/**
 * Created by AshZhang on 15/6/28.
 */


describe('String', function () {

  it('trim()', function () {
    expect('  abc  '.trim()).to.be.equal('abc');
    expect('  abc'.trim()).to.be.equal('abc');
    expect('abc   '.trim()).to.be.equal('abc');
  });
});