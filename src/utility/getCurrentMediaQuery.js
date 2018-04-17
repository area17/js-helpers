var getCurrentMediaQuery = function() {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/getCurrentMediaQuery

  function parse(str) {
    return str.replace(/'/gi, '').replace(/"/gi, '');
  }

  if (window.opera) {
    return parse(window.getComputedStyle(document.body, ':after').getPropertyValue('content')) || 'large';
  } else if (window.getComputedStyle) {
    return parse(window.getComputedStyle(document.head, null).getPropertyValue('font-family')) || 'large';
  } else {
    return 'large';
  }
};


export default getCurrentMediaQuery;
