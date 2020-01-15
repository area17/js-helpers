import resized from './../src/utility/resized';

jest.mock('./../src/utility/getCurrentMediaQuery.js', () =>
  jest
    .fn(() => 'default')
    .mockImplementationOnce(() => 'first call')
    .mockImplementationOnce(() => 'second call')
    .mockImplementationOnce(() => 'third call')
);

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
