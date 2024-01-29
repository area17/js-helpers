/**
  * responsiveImageSrcset : outputs HTML srcset string, with default sizes
  * @param {string} url - base url of image
  * @param {object} options - output options
  * @returns {string} - for image `srcset` attribute
  *
*/
const responsiveImageSrcset = (url, options = {}) => {
  // Doc: https://github.com/area17/js-helpers/wiki/responsiveImageSrcset
  if (!url) {
    return '';
  }

  let opts = {
    sizes: [200,400,600,1000,1600,2200,2800],
    overwrite: true,
    defaultParams: true,
    ...options,
  };

  if (opts.params) {
    delete opts.params;
  }
  opts.params = options.defaultParams === false ? {
    ...options.params,
  } : {
    q: 75,
    fm: 'auto',
    auto: 'compress,format',
    fit: 'min',
    ...options.params,
  };

  let srcset = '';
  const imgUrl = new URL(url);
  let params = Object.fromEntries(imgUrl.searchParams);
  let sizesLength = opts.sizes.length;

  if (opts.overwrite) {
    params = {
      ...params,
      ...opts.params,
    };
  } else {
    params = {
      ...opts.params,
      ...params,
    };
  }

  opts.sizes.forEach((size, index) => {
    params.w = size;
    params.width = size;
    let sizeParams = new URLSearchParams(params);
    srcset += `${ imgUrl.origin }${ imgUrl.pathname }?${ sizeParams.toString() } ${ size }w${ index < sizesLength - 1 ? ', ' : '' }`;
  });

  return srcset;
};

export default responsiveImageSrcset;
