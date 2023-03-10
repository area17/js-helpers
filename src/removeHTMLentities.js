const removeHTMLentities = function(str, replaceMode = false) {
  // Doc: https://github.com/area17/a17-behaviors/wiki/removeHTMLentities

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
