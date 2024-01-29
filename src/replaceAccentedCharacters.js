/**
 * replaceAccentedCharacters - Replace accented characters (Diacritics) with regular ASCII characters
 *
 * @param {string} str - The string to convert.
 * @returns {string} - Returns the converted string.
 */
const replaceAccentedCharacters = function (str) {
  // Doc: https://github.com/area17/js-helpers/wiki/replaceAccentedCharacters

  if (typeof str === 'string') {
    return str.normalize('NFD').replace(/\p{Diacritic}/ugm, '');
  } else {
    console.log('Warning - replaceAccentedCharacters - no string passed');
    return '';
  }
};

export default replaceAccentedCharacters;
