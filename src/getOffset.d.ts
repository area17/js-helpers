export default getOffset;
/**
 * getOffset : Get the current coordinates of a node, relative to the document, corrected by scroll. Uses getBoundingClientRect
 *
 * @param {HTMLElement} node The node to get the offset of
 * @returns {Object|null} The offset of the node
 */
declare function getOffset(node: HTMLElement): any | null;
