import resized from './../src/utility/resized';

jest.mock('./../src/utility/getCurrentMediaQuery.js', () =>
  jest
    .fn(() => 'default')
    .mockImplementationOnce(() => 'first call')
    .mockImplementationOnce(() => 'second call')
    .mockImplementationOnce(() => 'third call')
);
// set up some html
const setUpHtml = () => {
  const div = document.createElement('div');
  div.innerHTML = `
    <h1>Hello <a href="#">Area 17</a></h1>
      `;
  return div;
};

describe('resized', () => {
  it('exists', () => {
    expect(typeof resized).toBe('function');
  });

  it('resize triggers', (done) => {
    resized();

    window.addEventListener('resized', () => {
      expect('triggered').toBeTruthy();
      done();
    });

    window.dispatchEvent(new Event('resize'));
  });

  it('media query triggers on media string update', (done) => {
    resized();
    window.addEventListener('mediaQueryUpdated', () => {
      expect('triggered').toBeTruthy();
      done();
    });
    window.dispatchEvent(new Event('resize'));
  });
});
