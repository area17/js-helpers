var escapeString = function(str) {
  // Doc: https://github.com/area17/a17-behaviors/wiki/escapeString

  if (typeof str === 'string') {
    var div = document.createElement('div');
    var text = document.createTextNode(str.replace(/<[^>]*>?/g, ''));
    div.appendChild(text);
    return encodeURIComponent(div.textContent);
  } else {
    console.log('Warning - escapeString - no string passed');
    return '';
  }
};

export default escapeString;
