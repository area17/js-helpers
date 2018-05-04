var getIndex = function (node, nodeList) {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/getIndex

  var nodes = nodeList || node.parentNode.childNodes;
  var nodesLength = nodes.length;
  var n = 0;

  for (var i = 0; i < nodesLength; i++) {
    if (nodes[i] === node) {
      return n;
    }
    if (nodes[i].nodeType === 1) {
      n++;
    }
  }

  return -1;

};

export default getIndex;
