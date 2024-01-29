/**
 * getIndex : Returns the index of a node in a nodeList
 *
 * @param {HTMLElement} node The node to get the index of
 * @param {NodeList} nodeList The nodeList to search in
 * @returns {number} The index of the node
 */
const getIndex = function (node, nodeList) {
  // Doc: https://github.com/area17/js-helpers/wiki/getIndex

  const nodes = nodeList || node.parentNode.childNodes;
  const nodesLength = nodes.length;
  let n = 0;

  for (let i = 0; i < nodesLength; i++) {
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
