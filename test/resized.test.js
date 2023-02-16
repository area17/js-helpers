import resized from './../src/resized';

jest.useFakeTimers();

jest.mock('./../src/getCurrentMediaQuery.js', () =>
  jest
    .fn(() => 'lg')
    .mockImplementationOnce(() => 'md')
    .mockImplementationOnce(() => 'sm')
    .mockImplementationOnce(() => 'xs')
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

  it.todo('documentElement ResizeObserver fires');
  /*
  it('documentElement ResizeObserver fires', () => {
    window.A17 = window.A17 || {};
    window.A17.currentMediaQuery = 'lg';

    jest.spyOn(document.documentElement, 'clientHeight', 'get').mockReturnValue(global.innerHeight);

    let triggered = false;

    window.addEventListener('resize', (e) => {
      triggered = true;
    });

    resized();

    global.innerHeight = global.innerHeight + 500;
    jest.spyOn(document.documentElement, 'clientHeight', 'get').mockReturnValue(global.innerHeight);
    window.A17.currentMediaQuery = 'md';
    global.ResizeObserver.observe();

    // Move on the timer
    jest.advanceTimersByTime(600);

    // test
    expect(triggered).toBe(true);
  });
  */
});
