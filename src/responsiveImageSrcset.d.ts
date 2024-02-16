export default responsiveImageSrcset;
/**
  * responsiveImageSrcset : outputs HTML srcset string, with default sizes
  * @param {string} url - base url of image
  * @param {object} options - output options
  * @returns {string} - for image `srcset` attribute
  *
*/
declare function responsiveImageSrcset(url: string, options?: object): string;
