import isBreakpoint from './../src/isBreakpoint.js';

function setup(bp) {
  const styles = document.createElement('style');
  styles.innerHTML = `html { --breakpoint: "${ bp || 'md' }" }`;
  document.head.appendChild(styles);
}

describe('isBreakpoint utility', () => {

  it('extend exists', () => {
    expect(typeof isBreakpoint).toBe('function');
  });

  it('correctly confirms breakpoint', () => {
    setup();

    const isSm = isBreakpoint('sm');
    const isMd = isBreakpoint('md');
    const isLg = isBreakpoint('lg');

    expect(isSm).toEqual(false);
    expect(isMd).toEqual(true);
    expect(isLg).toEqual(false);
  });

  it('correctly confirms breakpoint+', () => {
    setup();

    const isSm = isBreakpoint('sm+');
    const isMd = isBreakpoint('md+');
    const isLg = isBreakpoint('lg+');

    expect(isSm).toEqual(true);
    expect(isMd).toEqual(true);
    expect(isLg).toEqual(false);
  });

  it('correctly confirms breakpoint-', () => {
    setup();

    const isSm = isBreakpoint('sm-');
    const isMd = isBreakpoint('md-');
    const isLg = isBreakpoint('lg-');

    expect(isSm).toEqual(false);
    expect(isMd).toEqual(true);
    expect(isLg).toEqual(true);
  });

  it('can use custom breakpoint array', () => {
    setup('earth');

    const bps = ['mercury', 'venus', 'earth', 'mars'];

    const isSm = isBreakpoint('mercury+', bps);
    const isMd = isBreakpoint('earth', bps);
    const isLg = isBreakpoint('mars', bps);

    expect(isSm).toEqual(true);
    expect(isMd).toEqual(true);
    expect(isLg).toEqual(false);
  });

  it('warns you if you use an invalid or missing options', () => {
    setup();

    const warn = global.console.warn;
    const error = global.console.error;

    let warning;
    let errorMsg;

    global.console.warn = jest.fn(
      (msg) => { warning = msg; return msg; }
    );

    global.console.error = jest.fn(
      (msg) => { errorMsg = msg; return msg; }
    );

    const isInvalid = isBreakpoint('steve');
    expect(warning).not.toBeUndefined();
    warning = undefined;

    const missing = isBreakpoint();
    expect(errorMsg).not.toBeUndefined();
    errorMsg = undefined;

    const isBadBpsArr = isBreakpoint('md', 'steve');
    expect(warning).not.toBeUndefined();
    warning = undefined;

    global.console.warn = warn;
    global.console.error = error;
  });

});
