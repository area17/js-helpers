const replaceAccentedCharacters = function (str) {
  // Doc: https://github.com/area17/a17-behaviors/wiki/replaceAccentedCharacters

  if (typeof str === 'string') {
    return str.normalize('NFD').replace(/\p{Diacritic}/ugm, '');
  } else {
    console.log('Warning - replaceAccentedCharacters - no string passed');
    return '';
  }
};

export default replaceAccentedCharacters;
