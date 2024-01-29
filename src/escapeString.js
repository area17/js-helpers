/**
 * escapeString : Strips a string of HTML and returns a URI encoded string of the text content of a string, useful for social sharing links
 *
 * @param {string} str required - string to be stripped
 * @returns {string} URI encoded string
 */
const escapeString = function(str) {
  // Doc: https://github.com/area17/js-helpers/wiki/escapeString

  if (typeof str === 'string') {
    const div = document.createElement('div');
    const text = document.createTextNode(str.replace(/<[^>]*>?/g, ''));
    div.appendChild(text);
    return encodeURIComponent(div.textContent);
  } else {
    console.log('Warning - escapeString - no string passed');
    return '';
  }
};

export default escapeString;
