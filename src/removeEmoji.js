/**
 * Removes Emoji from a string
 *
 * @param {string} str - The string to convert.
 * @returns {string} - Returns the converted string.
 */
const removeEmoji = function (str) {
  // Doc: https://github.com/area17/js-helpers/wiki/removeEmoji

  if (typeof str === 'string') {
    return str.replace(/(?![*#0-9]+)[\p{Emoji}\p{Emoji_Modifier}\p{Emoji_Component}\p{Emoji_Modifier_Base}\p{Emoji_Presentation}]/ugm, '');
  } else {
    console.log('Warning - removeEmoji - no string passed');
    return '';
  }
};

export default removeEmoji;
