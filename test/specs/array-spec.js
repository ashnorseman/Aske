/**
 * Created by AshZhang on 15/6/27.
 */


describe('Array', function () {

  it('contains()', function () {
    var array = [2, 5, 9];

    expect(array.contains(2)).to.be.equal(true);
    expect(array.contains(5)).to.be.equal(true);
    expect(array.contains(9)).to.be.equal(true);
    expect(array.contains(7)).to.be.equal(false);
  });

  it('pack()', function () {
    var array = [2, undefined, 9];

    expect(array.pack()).to.be.length(2);
    expect(array.pack()[0]).to.be.equal(2);
    expect(array.pack()[1]).to.be.equal(9);

    expect([1, 2, 3].pack()).to.be.length(3);
  });

  it('forEach()', function () {
    var array = [2, 5, 9];

    array.forEach(function (item, i, arr) {
      arr[i] = item * 2;
    });

    expect(array[0]).to.be.equal(4);

    array.forEach(function (item, i, arr) {
      arr[i] = item * this.num;
    }, { num: 2 });

    expect(array[0]).to.be.equal(8);
  });
});