var escapeString = function(str) {
  // Doc: https://code.area17.com/mike/a17-js-helpers/wikis/A17-Helpers-escapeString

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
