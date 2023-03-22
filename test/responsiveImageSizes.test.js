import responsiveImageSizes from './../src/responsiveImageSizes';

const feConfig = {
  "structure": {
    "breakpoints": {
      "sm": "0",
      "md": "600px",
      "lg": "900px",
      "xl": "1200px",
      "xxl": "1500px",
      "xxxl": "1944px"
    },
    "columns": {
      "sm": "4",
      "md": "8",
      "lg": "12",
      "xl": "12",
      "xxl": "12",
      "xxxl": "12"
    },
    "container": {
      "sm": "auto",
      "md": "auto",
      "lg": "auto",
      "xl": "auto",
      "xxl": "auto",
      "xxxl": "1800px"
    },
    "gutters": {
      "inner": {
        "sm": "20px",
        "md": "36px",
        "lg": "36px",
        "xl": "48px",
        "xxl": "60px",
        "xxxl": "60px"
      },
      "outer": {
        "sm": "24px",
        "md": "28px",
        "lg": "48px",
        "xl": "60px",
        "xxl": "72px",
        "xxxl": "0px"
      }
    }
  }
}

describe('responsiveImageSizes utility', () => {
  it('responsiveImageSizes exists', () => {
    expect(typeof responsiveImageSizes).toBe('function');
  });

  test('generates a sizes string with rem units', () => {
    let sizes = responsiveImageSizes({
      "sm": "100vw",
      "md": 4,
      "lg": 7,
      "xl": "80%",
      "xxl": "300px"
    }, feConfig);
    let expected = '(min-width: 93.75rem) 18.75rem, (min-width: 75rem) 80%, (min-width: 56.25rem) 58.33vw, (min-width: 37.5rem) 50vw, 100vw';

    expect(sizes).toEqual(expected);

    sizes = responsiveImageSizes({
      "sm": 2,
    }, feConfig);
    expected = '(min-width: 121.5rem) 15.625rem, (min-width: 56.25rem) 16.67vw, (min-width: 37.5rem) 25vw, 50vw';

    expect(sizes).toEqual(expected);
  });

  test('generates a sizes string with pixel units', () => {
    let sizes = responsiveImageSizes({
      "sm": "100vw",
      "md": 4,
      "lg": 7,
      "xl": "80%",
      "xxl": "300px"
    }, feConfig, false);
    let expected = '(min-width: 1500px) 300px, (min-width: 1200px) 80%, (min-width: 900px) 58.33vw, (min-width: 600px) 50vw, 100vw';

    expect(sizes).toEqual(expected);

    sizes = responsiveImageSizes({
      "sm": 2,
    }, feConfig, false);
    expected = '(min-width: 1944px) 250px, (min-width: 900px) 16.67vw, (min-width: 600px) 25vw, 50vw';

    expect(sizes).toEqual(expected);
  });

  test('if no bp passed, defaults to 100vw', () => {
    let sizes = responsiveImageSizes({
      "lg": 2,
    }, feConfig);
    let expected = '(min-width: 121.5rem) 15.625rem, (min-width: 56.25rem) 16.67vw, 100vw';

    expect(sizes).toEqual(expected);

    sizes = responsiveImageSizes({}, feConfig);
    expected = '100vw';

    expect(sizes).toEqual(expected);
  });

  test('returns a passed string', () => {
    let sizes = responsiveImageSizes('100vw', feConfig);
    let expected = '100vw';

    expect(sizes).toEqual(expected);
  });

  test('converts a passed array', () => {
    let sizes = responsiveImageSizes([
      { sm: '100vw' },
      { md: '50vw' },
      { lg: '58.33vw' },
      { xl: '80%' },
      { xxl: '300px' }
    ], feConfig);
    let expected = '(min-width: 93.75rem) 18.75rem, (min-width: 75rem) 80%, (min-width: 56.25rem) 58.33vw, (min-width: 37.5rem) 50vw, 100vw';

    expect(sizes).toEqual(expected);
  });
});
