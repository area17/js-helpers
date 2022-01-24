import getIndex from './../src/getIndex';

const setUpHtml = () => {
  const div = document.createElement('div');
  div.innerHTML = `
    <ul>
      <li>first</li>
      <li>second</li>
      <li>third</li>
    </ul>
      `;
  return div;
};

describe('getIndex utility', () => {
  it('exists', () => {
    expect(typeof getIndex).toBe('function');
  });

  it('getsIndex', () => {
    const container = setUpHtml();
    const items = container.querySelectorAll('li');
    const seconNode = [...container.querySelectorAll('li')][1];
    expect(getIndex(seconNode, items)).toBe(1);
  });
});
