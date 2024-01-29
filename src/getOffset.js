/**
 * getOffset : Get the current coordinates of a node, relative to the document, corrected by scroll. Uses getBoundingClientRect
 *
 * @param {HTMLElement} node The node to get the offset of
 * @returns {Object|null} The offset of the node
 */
const getOffset = function(node) {
  // Doc: https://github.com/area17/js-helpers/wiki/getOffset

  if (node) {
    var rect = node.getBoundingClientRect();
    return {
      top: rect.top + (document.documentElement.scrollTop || document.body.scrollTop),
      left: rect.left + (document.documentElement.scrollLeft || document.body.scrollLeft),
      bottom: rect.bottom + (document.documentElement.scrollTop || document.body.scrollTop),
      right: rect.right + (document.documentElement.scrollLeft || document.body.scrollLeft),
      width: rect.width,
      height: rect.height
    };
  } else {
    return null;
  }
};

export default getOffset;
