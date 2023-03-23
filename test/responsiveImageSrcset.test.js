import responsiveImageSrcset from './../src/responsiveImageSrcset';

const baseImgUrl = 'https://area17.imgix.net/0000/image.jpg';
const complexImgUrl = 'https://area17.imgix.net/0000/image.jpg?px=10&q=90&w=1480';

describe('responsiveImageSrcset utility', () => {
  it('responsiveImageSrcset exists', () => {
    expect(typeof responsiveImageSrcset).toBe('function');
  });

  test('srcset from basic url, using defaults', () => {
    let srcset = responsiveImageSrcset(baseImgUrl);
    let expected = 'https://area17.imgix.net/0000/image.jpg?q=75&fm=auto&auto=compress%2Cformat&fit=min&w=200&width=200 200w, https://area17.imgix.net/0000/image.jpg?q=75&fm=auto&auto=compress%2Cformat&fit=min&w=400&width=400 400w, https://area17.imgix.net/0000/image.jpg?q=75&fm=auto&auto=compress%2Cformat&fit=min&w=600&width=600 600w, https://area17.imgix.net/0000/image.jpg?q=75&fm=auto&auto=compress%2Cformat&fit=min&w=1000&width=1000 1000w, https://area17.imgix.net/0000/image.jpg?q=75&fm=auto&auto=compress%2Cformat&fit=min&w=1600&width=1600 1600w, https://area17.imgix.net/0000/image.jpg?q=75&fm=auto&auto=compress%2Cformat&fit=min&w=2200&width=2200 2200w, https://area17.imgix.net/0000/image.jpg?q=75&fm=auto&auto=compress%2Cformat&fit=min&w=2800&width=2800 2800w';

    expect(srcset).toEqual(expected);
  });

  test('srcset from url with search params, using defaults', () => {
    let srcset = responsiveImageSrcset(complexImgUrl);
    let expected = 'https://area17.imgix.net/0000/image.jpg?px=10&q=75&w=200&fm=auto&auto=compress%2Cformat&fit=min&width=200 200w, https://area17.imgix.net/0000/image.jpg?px=10&q=75&w=400&fm=auto&auto=compress%2Cformat&fit=min&width=400 400w, https://area17.imgix.net/0000/image.jpg?px=10&q=75&w=600&fm=auto&auto=compress%2Cformat&fit=min&width=600 600w, https://area17.imgix.net/0000/image.jpg?px=10&q=75&w=1000&fm=auto&auto=compress%2Cformat&fit=min&width=1000 1000w, https://area17.imgix.net/0000/image.jpg?px=10&q=75&w=1600&fm=auto&auto=compress%2Cformat&fit=min&width=1600 1600w, https://area17.imgix.net/0000/image.jpg?px=10&q=75&w=2200&fm=auto&auto=compress%2Cformat&fit=min&width=2200 2200w, https://area17.imgix.net/0000/image.jpg?px=10&q=75&w=2800&fm=auto&auto=compress%2Cformat&fit=min&width=2800 2800w';

    expect(srcset).toEqual(expected);
  });

  test('generates custom sizes', () => {
    let srcset = responsiveImageSrcset(baseImgUrl, {
      sizes: [50, 100]
    });
    let expected = 'https://area17.imgix.net/0000/image.jpg?q=75&fm=auto&auto=compress%2Cformat&fit=min&w=50&width=50 50w, https://area17.imgix.net/0000/image.jpg?q=75&fm=auto&auto=compress%2Cformat&fit=min&w=100&width=100 100w';

    expect(srcset).toEqual(expected);
  });

  test('adds param to basic url, using defaults', () => {
    let srcset = responsiveImageSrcset(baseImgUrl, {
      params: {
        q: 60
      }
    });
    let expected = 'https://area17.imgix.net/0000/image.jpg?q=60&fm=auto&auto=compress%2Cformat&fit=min&w=200&width=200 200w, https://area17.imgix.net/0000/image.jpg?q=60&fm=auto&auto=compress%2Cformat&fit=min&w=400&width=400 400w, https://area17.imgix.net/0000/image.jpg?q=60&fm=auto&auto=compress%2Cformat&fit=min&w=600&width=600 600w, https://area17.imgix.net/0000/image.jpg?q=60&fm=auto&auto=compress%2Cformat&fit=min&w=1000&width=1000 1000w, https://area17.imgix.net/0000/image.jpg?q=60&fm=auto&auto=compress%2Cformat&fit=min&w=1600&width=1600 1600w, https://area17.imgix.net/0000/image.jpg?q=60&fm=auto&auto=compress%2Cformat&fit=min&w=2200&width=2200 2200w, https://area17.imgix.net/0000/image.jpg?q=60&fm=auto&auto=compress%2Cformat&fit=min&w=2800&width=2800 2800w';

    expect(srcset).toEqual(expected);
  });

  test('overwrites param on url with search params, using defaults', () => {
    let srcset = responsiveImageSrcset(complexImgUrl, {
      params: {
        q: 60,
        blur: 20,
      }
    });
    let expected = 'https://area17.imgix.net/0000/image.jpg?px=10&q=60&w=200&fm=auto&auto=compress%2Cformat&fit=min&blur=20&width=200 200w, https://area17.imgix.net/0000/image.jpg?px=10&q=60&w=400&fm=auto&auto=compress%2Cformat&fit=min&blur=20&width=400 400w, https://area17.imgix.net/0000/image.jpg?px=10&q=60&w=600&fm=auto&auto=compress%2Cformat&fit=min&blur=20&width=600 600w, https://area17.imgix.net/0000/image.jpg?px=10&q=60&w=1000&fm=auto&auto=compress%2Cformat&fit=min&blur=20&width=1000 1000w, https://area17.imgix.net/0000/image.jpg?px=10&q=60&w=1600&fm=auto&auto=compress%2Cformat&fit=min&blur=20&width=1600 1600w, https://area17.imgix.net/0000/image.jpg?px=10&q=60&w=2200&fm=auto&auto=compress%2Cformat&fit=min&blur=20&width=2200 2200w, https://area17.imgix.net/0000/image.jpg?px=10&q=60&w=2800&fm=auto&auto=compress%2Cformat&fit=min&blur=20&width=2800 2800w';

    expect(srcset).toEqual(expected);
  });

  test('doesn\'t overwrite params on url with search params, using defaults', () => {
    let srcset = responsiveImageSrcset(complexImgUrl, {
      overwrite: false,
      params: {
        q: 75,
        blur: 20,
      }
    });
    let expected = 'https://area17.imgix.net/0000/image.jpg?q=90&fm=auto&auto=compress%2Cformat&fit=min&blur=20&px=10&w=200&width=200 200w, https://area17.imgix.net/0000/image.jpg?q=90&fm=auto&auto=compress%2Cformat&fit=min&blur=20&px=10&w=400&width=400 400w, https://area17.imgix.net/0000/image.jpg?q=90&fm=auto&auto=compress%2Cformat&fit=min&blur=20&px=10&w=600&width=600 600w, https://area17.imgix.net/0000/image.jpg?q=90&fm=auto&auto=compress%2Cformat&fit=min&blur=20&px=10&w=1000&width=1000 1000w, https://area17.imgix.net/0000/image.jpg?q=90&fm=auto&auto=compress%2Cformat&fit=min&blur=20&px=10&w=1600&width=1600 1600w, https://area17.imgix.net/0000/image.jpg?q=90&fm=auto&auto=compress%2Cformat&fit=min&blur=20&px=10&w=2200&width=2200 2200w, https://area17.imgix.net/0000/image.jpg?q=90&fm=auto&auto=compress%2Cformat&fit=min&blur=20&px=10&w=2800&width=2800 2800w';

    expect(srcset).toEqual(expected);
  });

  // ~~~~~~~~~

  test('srcset from basic url, no defaults', () => {
    let srcset = responsiveImageSrcset(baseImgUrl, { defaultParams: false });
    let expected = 'https://area17.imgix.net/0000/image.jpg?w=200&width=200 200w, https://area17.imgix.net/0000/image.jpg?w=400&width=400 400w, https://area17.imgix.net/0000/image.jpg?w=600&width=600 600w, https://area17.imgix.net/0000/image.jpg?w=1000&width=1000 1000w, https://area17.imgix.net/0000/image.jpg?w=1600&width=1600 1600w, https://area17.imgix.net/0000/image.jpg?w=2200&width=2200 2200w, https://area17.imgix.net/0000/image.jpg?w=2800&width=2800 2800w';

    expect(srcset).toEqual(expected);
  });

  test('srcset from url with search params, no defaults', () => {
    let srcset = responsiveImageSrcset(complexImgUrl, { defaultParams: false });
    let expected = 'https://area17.imgix.net/0000/image.jpg?px=10&q=90&w=200&width=200 200w, https://area17.imgix.net/0000/image.jpg?px=10&q=90&w=400&width=400 400w, https://area17.imgix.net/0000/image.jpg?px=10&q=90&w=600&width=600 600w, https://area17.imgix.net/0000/image.jpg?px=10&q=90&w=1000&width=1000 1000w, https://area17.imgix.net/0000/image.jpg?px=10&q=90&w=1600&width=1600 1600w, https://area17.imgix.net/0000/image.jpg?px=10&q=90&w=2200&width=2200 2200w, https://area17.imgix.net/0000/image.jpg?px=10&q=90&w=2800&width=2800 2800w';

    expect(srcset).toEqual(expected);
  });

  test('adds param to basic url, no defaults', () => {
    let srcset = responsiveImageSrcset(baseImgUrl, {
      defaultParams: false,
      params: {
        q: 60
      }
    });
    let expected = 'https://area17.imgix.net/0000/image.jpg?q=60&w=200&width=200 200w, https://area17.imgix.net/0000/image.jpg?q=60&w=400&width=400 400w, https://area17.imgix.net/0000/image.jpg?q=60&w=600&width=600 600w, https://area17.imgix.net/0000/image.jpg?q=60&w=1000&width=1000 1000w, https://area17.imgix.net/0000/image.jpg?q=60&w=1600&width=1600 1600w, https://area17.imgix.net/0000/image.jpg?q=60&w=2200&width=2200 2200w, https://area17.imgix.net/0000/image.jpg?q=60&w=2800&width=2800 2800w';

    expect(srcset).toEqual(expected);
  });

  test('overwrites param on url with search params, no defaults', () => {
    let srcset = responsiveImageSrcset(complexImgUrl, {
      defaultParams: false,
      params: {
        q: 60,
        blur: 20,
      }
    });
    let expected = 'https://area17.imgix.net/0000/image.jpg?px=10&q=60&w=200&blur=20&width=200 200w, https://area17.imgix.net/0000/image.jpg?px=10&q=60&w=400&blur=20&width=400 400w, https://area17.imgix.net/0000/image.jpg?px=10&q=60&w=600&blur=20&width=600 600w, https://area17.imgix.net/0000/image.jpg?px=10&q=60&w=1000&blur=20&width=1000 1000w, https://area17.imgix.net/0000/image.jpg?px=10&q=60&w=1600&blur=20&width=1600 1600w, https://area17.imgix.net/0000/image.jpg?px=10&q=60&w=2200&blur=20&width=2200 2200w, https://area17.imgix.net/0000/image.jpg?px=10&q=60&w=2800&blur=20&width=2800 2800w';

    expect(srcset).toEqual(expected);
  });

  test('doesn\'t overwrites params on url with search params, no defaults', () => {
    let srcset = responsiveImageSrcset(complexImgUrl, {
      defaultParams: false,
      overwrite: false,
      params: {
        q: 75,
        blur: 20,
      }
    });
    let expected = 'https://area17.imgix.net/0000/image.jpg?q=90&blur=20&px=10&w=200&width=200 200w, https://area17.imgix.net/0000/image.jpg?q=90&blur=20&px=10&w=400&width=400 400w, https://area17.imgix.net/0000/image.jpg?q=90&blur=20&px=10&w=600&width=600 600w, https://area17.imgix.net/0000/image.jpg?q=90&blur=20&px=10&w=1000&width=1000 1000w, https://area17.imgix.net/0000/image.jpg?q=90&blur=20&px=10&w=1600&width=1600 1600w, https://area17.imgix.net/0000/image.jpg?q=90&blur=20&px=10&w=2200&width=2200 2200w, https://area17.imgix.net/0000/image.jpg?q=90&blur=20&px=10&w=2800&width=2800 2800w';

    expect(srcset).toEqual(expected);
  });
});
