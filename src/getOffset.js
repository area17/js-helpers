var getOffset = function(node) {
  // Doc: https://code.area17.com/mike/a17-js-helpers/wikis/A17-Helpers-getOffset

  if (node) {
    var rect = node.getBoundingClientRect();
    return {
      top: rect.top + (document.documentElement.scrollTop || document.body.scrollTop),
      left: rect.left + (document.documentElement.scrollLeft || document.body.scrollLeft)
    };
  } else {
    return null;
  }
};

export default getOffset;