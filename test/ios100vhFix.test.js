import ios100vhFix from './../src/ios100vhFix';

describe('ios100vhFix utility', () => {

  it('extend exists', () => {
    expect(typeof ios100vhFix).toBe('function');
  });

  it('writes CSS variable correctly', () => {
    const h = 1024;
    jest.spyOn(document.documentElement, 'clientHeight', 'get').mockReturnValue(h);
    ios100vhFix();
    const vh = getComputedStyle(document.documentElement).getPropertyValue('--vh');
    expect(vh).toEqual(`${ h * 0.01 }px`);
  });
});
