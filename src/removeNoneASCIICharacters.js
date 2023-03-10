const removeNoneASCIICharacters = function (str) {
  // Doc: https://github.com/area17/a17-behaviors/wiki/removeNoneASCIICharacters

  // Easy way to spot hidden characters - https://www.soscisurvey.de/tools/view-chars.php

  if (typeof str === 'string') {
    return str => str.replace(/\P{ASCII}/ugm, '');
  } else {
    console.log('Warning - removeNoneASCIICharacters - no string passed');
    return '';
  }
};

export default removeNoneASCIICharacters;
