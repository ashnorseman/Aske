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