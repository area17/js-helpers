export default getCurrentMediaQuery;
/**
 * getCurrentMediaQuery : Returns the current media query in use by reading a CSS :root variable. Useful for running JS functions at certain breakpoints without holding breakpoint size information in CSS and JS.
 *
 * @returns {string} Media query string
 */
declare function getCurrentMediaQuery(): string;
