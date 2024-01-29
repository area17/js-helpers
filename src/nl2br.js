/**
 * nl2br : This function is similar to PHP's nl2br()
 *
 * @param {string} str Input text
 * @param {boolean} replaceMode Use replace instead of insert
 * @return {string} Filtered text
 */
const nl2br = function(str, replaceMode = true) {
  // Doc: https://github.com/area17/js-helpers/wiki/nl2br

  if (typeof str === 'string') {
    const breakTag = '<br>';
    const replaceStr = replaceMode ? '$1' + breakTag : '$1' + breakTag + '$2';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, replaceStr);
  } else {
    console.log('Warning - nl2br - no string passed');
    return '';
  }
}

export default nl2br;
