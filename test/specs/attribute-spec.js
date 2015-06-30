
// Attribute Spec
// ---------------------------


describe('Attribute', function () {

  it('Element.attr()', function () {
    var div = document.createElement('div');

    expect(div.attr('data-test')).to.be.equal(null);
    expect(div.attr('lang')).to.be.equal(null);

    div.attr('data-test', 'testing');
    div.attr('lang', 'zh');
    expect(div.attr('data-test')).to.be.equal('testing');
    expect(div.attr('lang')).to.be.equal('zh');

    div.attr('data-test', function (oldAttr) {
      return this.tagName.toUpperCase() + oldAttr;
    });
    expect(div.attr('data-test')).to.be.equal('DIVtesting');
  });

  it('Element.prop()', function () {
    var input = document.createElement('input');

    input.type = 'checkbox';
    document.body.appendChild(input);

    expect(input.prop('checked')).to.be.equal(false);

    input.prop('checked', true);
    expect(input.prop('checked')).to.be.equal(true);

    input.prop('checked', function (oldAttr) {
      return !oldAttr;
    });
    expect(input.prop('checked')).to.be.equal(false);

    document.body.removeChild(input);
  });

  it('Element.removeProp()', function () {
    var input = document.createElement('input');

    input.type = 'checkbox';
    input.checked = true;
    document.body.appendChild(input);

    expect(input.prop('checked')).to.be.equal(true);

    input.removeProp('checked');
    expect(input.prop('checked')).to.be.equal(false);

    document.body.removeChild(input);
  });

  it('Element.hasClass()', function () {
    var div = document.createElement('div');

    div.className = 'class1 class2';

    expect(div.hasClass('class')).to.be.not.ok;
    expect(div.hasClass('class1')).to.be.ok;
    expect(div.hasClass('class2')).to.be.ok;

    div.className = 'class-1 class-2';

    expect(div.hasClass('class')).to.be.not.ok;
    expect(div.hasClass('class-1')).to.be.ok;
    expect(div.hasClass('class-2')).to.be.ok;

    div.className = 'class';

    expect(div.hasClass('class')).to.be.ok;
  });

  it('Element.addClass()', function () {
    var div = document.createElement('div');

    expect(div.className).to.be.not.ok;

    div.addClass('abc');
    expect(div.className).to.be.equal('abc');

    div.addClass('abcd');
    expect(div.className).to.be.equal('abc abcd');

    div.addClass('abc abcde');
    expect(div.className).to.be.equal('abc abcd abcde');
  });

  it('Element.removeClass()', function () {
    var div = document.createElement('div');

    div.className = 'abc abcd abcde';
    expect(div.className).to.be.equal('abc abcd abcde');

    div.removeClass('abc');
    expect(div.className).to.be.equal('abcd abcde');

    div.removeClass('abcd abcde');
    expect(div.className).to.be.equal('');
  });

  it('Element.toggleClass()', function () {
    var div = document.createElement('div');

    div.className = 'abc abcd abcde';
    expect(div.className).to.be.equal('abc abcd abcde');

    div.toggleClass('abc');
    expect(div.className).to.be.equal('abcd abcde');

    div.toggleClass('abc');
    expect(div.className).to.be.equal('abcd abcde abc');

    div.toggleClass('abc', false);
    expect(div.className).to.be.equal('abcd abcde');

    div.toggleClass('abc', true);
    expect(div.className).to.be.equal('abcd abcde abc');

    div.toggleClass('abc', function (oldClass) { return oldClass === 'abc'; });
    expect(div.className).to.be.equal('abcd abcde');

    div.toggleClass('abc', function (oldClass) { return oldClass === 'abcd abcde'; });
    expect(div.className).to.be.equal('abcd abcde abc');
  });

  it('Element.html()', function () {
    var div = document.createElement('div');

    expect(div.innerHTML).to.be.equal('');
    expect(div.html()).to.be.equal('');

    div.html('<span>abc</span>');
    expect(div.innerHTML).to.be.equal('<span>abc</span>');
    expect(div.html()).to.be.equal('<span>abc</span>');

    expect(div.qs('span').tagName.toUpperCase()).to.be.equal('SPAN');
  });

  it('Element.text()', function () {
    var div = document.createElement('div');

    expect(div.text()).to.be.equal('');

    div.text('abc');
    expect(div.text()).to.be.equal('abc');

    div.text('<span>abc</span>');
    expect(div.text()).to.be.equal('<span>abc</span>');
  });

  it('Element.val()', function () {
    var input = document.createElement('input');

    document.body.appendChild(input);

    expect(input.val()).to.be.equal('');

    input.value = 'test';
    expect(input.val()).to.be.equal('test');

    input.val('test-again');
    expect(input.val()).to.be.equal('test-again');

    input.val(function (oldVal) {
      return this.tagName.toUpperCase() + oldVal;
    });
    expect(input.val()).to.be.equal('INPUTtest-again');

    document.body.removeChild(input);
  });

  it('Element.val() - select', function () {
    var select = document.createElement('select');

    select.innerHTML = '<option value="0"></option><option>1</option><option>2</option>';

    document.body.appendChild(select);

    expect(select.val()).to.be.equal('0');

    select.qsa('option')[1].selected = true;
    expect(select.val()).to.be.equal('1');

    select.prop('multiple', true);
    select.qsa('option')[2].selected = true;
    expect(select.val()).to.be.length(2);
    expect(select.val()[0]).to.be.equal('1');
    expect(select.val()[1]).to.be.equal('2');

    select.val(['0', '1']);
    expect(select.val()[0]).to.be.equal('0');
    expect(select.val()[1]).to.be.equal('1');
    expect(select.qsa('option')[0].selected).to.be.ok;
    expect(select.qsa('option')[1].selected).to.be.ok;
    expect(select.qsa('option')[2].selected).to.be.not.ok;

    select.prop('multiple', false);
    select.val('1');
    expect(select.val()).to.be.equal('1');
    expect(select.qsa('option')[0].selected).to.be.not.ok;
    expect(select.qsa('option')[1].selected).to.be.ok;
    expect(select.qsa('option')[2].selected).to.be.not.ok;

    select.val(function (oldVal) {
      return '2';
    });
    expect(select.val()).to.be.equal('2');

    document.body.removeChild(select);
  });
});