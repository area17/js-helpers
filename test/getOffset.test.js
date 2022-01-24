import getOffset from './../src/getOffset';

describe('getOffset utility', () => {
  it('exists', () => {
    expect(typeof getOffset).toBe('function');
  });

  it('default return', () => {

    const dims = {
      width: 13,
      height: 12,
      left: 100,
      top: 200,
      scrollTop: 1312
    };

    const getBoundingClientRect = Element.prototype.getBoundingClientRect;
    const scrollTop = document.documentElement.scrollTop;

    var div = document.createElement('div');
    div.style.width = `${ dims.width }px`;
    div.style.height = `${ dims.height }px`;
    div.style.position = 'absolute';
    div.style.left = `${ dims.left }px`;
    div.style.top = `${ dims.top }px`;
    document.body.appendChild(div);

    document.documentElement.scrollTop = dims.scrollTop;
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      top: dims.top,
      left: dims.left,
      bottom: 0,
      right: 0,
      width: dims.width,
      height: dims.height,
    }));

    const offset = getOffset(div);

    expect(offset).toEqual({
      top: dims.top + dims.scrollTop,
      left: dims.left,
      bottom: dims.scrollTop,
      right: 0,
      width: dims.width,
      height: dims.height,
    });

    Element.prototype.getBoundingClientRect = getBoundingClientRect;
    document.documentElement.scrollTop = scrollTop;
  });
});
