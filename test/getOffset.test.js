import getOffset from './../src/utility/getOffset';

// set up some html
const setUpHtml = () => {
  const div = document.createElement('div');
  div.innerHTML = `
    <div class="getMe" style="height: 200px; width: 300px;"></div>
      `;
  return div;
};

describe('getOffset utility', () => {
  it('exists', () => {
    expect(typeof getOffset).toBe('function');
  });

  it('default return', () => {
    const container = setUpHtml();
    const offset = getOffset(container.querySelector('.getMe'));
    expect(offset).toEqual({
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: 0,
      height: 0,
    });
  });
});
