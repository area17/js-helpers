/**
 * Remove none ASCII characters from a string
 *
 * @param {string} str - The string to convert.
 * @returns {string} - Returns the converted string.
 */
const removeNoneASCIICharacters = function (str) {
  // Doc: https://github.com/area17/js-helpers/wiki/removeNoneASCIICharacters

  // Easy way to spot hidden characters - https://www.soscisurvey.de/tools/view-chars.php

  if (typeof str === 'string') {
    return str.replace(/\P{ASCII}/ugm, '');
  } else {
    console.log('Warning - removeNoneASCIICharacters - no string passed');
    return '';
  }
};

export default removeNoneASCIICharacters;
