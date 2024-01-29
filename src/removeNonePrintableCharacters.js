/**
 * removeNonePrintableCharacters - Removes or replaces non printable characters from a string, whilst leaving ASCII and non ASCII characters alone.
 *
 * @param {string} str - The string to convert.
 * @param {boolean} replaceMode - switch to replace mode from remove mode
 * @returns {string} Returns the converted string.
 */
const removeNonePrintableCharacters = function (str, replaceMode = false) {
  // Doc: https://github.com/area17/js-helpers/wiki/removeNonePrintableCharacters

  // https://stackoverflow.com/questions/11598786/how-to-replace-non-printable-unicode-characters-javascript
  // Easy way to spot hidden characters - https://www.soscisurvey.de/tools/view-chars.php

  if (typeof str === 'string') {
    if (replaceMode) {
      return str.replace(/\p{C}/ugm, '').replace(/\n\r/ugm, '\n').replace(/\p{Zl}/ugm, '\n').replace(/\p{Zp}/ugm, '\n').replace(/\p{Zs}/ugm, ' ');
    } else {
      return str.replace(/\p{C}/ugm, '').replace(/\n\r/ugm, '').replace(/\p{Zl}/ugm, '\n').replace(/\p{Zp}/ugm, '').replace(/(?! )\p{Zs}/ugm, '');
    }
  } else {
    console.log('Warning - removeNonePrintableCharacters - no string passed');
    return '';
  }
};

export default removeNonePrintableCharacters;
