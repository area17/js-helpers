import escapeString from './../src/escapeString.js';

// set up some html
const setUpHtml = () => {
  const div = document.createElement('div');
  div.innerHTML = `
    <h1>Hello <a href="#">Area 17</a></h1>
      `;
  return div;
};

describe('escape string', () => {
  it('exists', () => {
    expect(typeof escapeString).toBe('function');
  });

  it('escapes html properly', () => {
    const container = setUpHtml();
    const stringToEscape = container.querySelector('h1').innerHTML;
    expect(escapeString(stringToEscape)).toBe('Hello%20Area%2017');
  });
});
