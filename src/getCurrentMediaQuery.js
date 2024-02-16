/**
 * getCurrentMediaQuery : Returns the current media query in use by reading a CSS :root variable. Useful for running JS functions at certain breakpoints without holding breakpoint size information in CSS and JS.
 *
 * @returns {string} Media query string
 */
const getCurrentMediaQuery = function() {
  // Doc: https://github.com/area17/js-helpers/wiki/getCurrentMediaQuery
  if(typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue('--breakpoint').trim().replace(/"/g, '');
};


export default getCurrentMediaQuery;
