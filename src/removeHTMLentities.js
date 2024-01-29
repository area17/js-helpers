/**
 * Removes or replaces HTML entities from a string
 *
 * @param {string} str - The string to convert.
 * @param {boolean} replaceMode - switch to replace mode from remove mode
 * @returns {string} - Returns the converted string.
 */
const removeHTMLentities = function(str, replaceMode = false) {
  // Doc: https://github.com/area17/js-helpers/wiki/removeHTMLentities

  if (typeof str === 'string') {
    if (replaceMode) {
      return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    } else {
      return str.replace(/&/g, '').replace(/</g, '').replace(/>/g, '').replace(/"/g, '');
    }
  } else {
    console.log('Warning - removeHTMLentities - no string passed');
    return '';
  }
}

export default removeHTMLentities;
