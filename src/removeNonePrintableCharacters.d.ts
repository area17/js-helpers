export default removeNonePrintableCharacters;
/**
 * removeNonePrintableCharacters - Removes or replaces non printable characters from a string, whilst leaving ASCII and non ASCII characters alone.
 *
 * @param {string} str - The string to convert.
 * @param {boolean} replaceMode - switch to replace mode from remove mode
 * @returns {string} Returns the converted string.
 */
declare function removeNonePrintableCharacters(str: string, replaceMode?: boolean): string;
