
// Object Spec
// ---------------------------


describe('Object', function () {

  it('extend()', function () {
    var a = {};

    a.extend({ a: 'a' });
    expect(a.a).to.be.equal('a');

    a = { a: 'b', c: 'd' };
    a.extend({ a: 'aa' });
    expect(a.a).to.be.equal('aa');
    expect(a.c).to.be.equal('d');

    a = { a: 'a' };
    a.extend({ b: 'b', c: 'b' }, { c: 'c' });
    expect(a.a).to.be.equal('a');
    expect(a.b).to.be.equal('b');
    expect(a.c).to.be.equal('c');
  });
});
