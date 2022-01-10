var escapeString = function(str) {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/escapeString

  if (typeof str === 'string') {
    var div = document.createElement('div');
    var text = document.createTextNode(str.replace(/<[^>]*>?/g, ''));
    div.appendChild(text);
    return encodeURIComponent(div.textContent);
  } else {
    return '';
  }
};

export default escapeString;
