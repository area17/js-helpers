var getIndex = function (node, nodeList) {
  // Doc: https://github.com/area17/a17-behaviors/wiki/getIndex

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
