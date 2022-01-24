import resized from './../src/resized';

jest.useFakeTimers();

jest.mock('./../src/getCurrentMediaQuery.js', () =>
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

  it('resize triggers', () => {
    resized();

    let triggered = false;

    window.addEventListener('resized', () => {
      triggered = true;
    });

    window.dispatchEvent(new Event('resize'));

    // Move on the timer
    jest.advanceTimersByTime(251);

    // test
    expect(triggered).toBe(true);
  });

  it('media query triggers on media string update', () => {
    resized();

    let triggered = false;

    window.addEventListener('mediaQueryUpdated', () => {
      triggered = true;
    });

    window.dispatchEvent(new Event('resize'));

    // Move on the timer
    jest.advanceTimersByTime(251);

    // test
    expect(triggered).toBe(true);
  });
});
