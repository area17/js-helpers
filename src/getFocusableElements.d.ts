export default getFocusableElements;
/**
 * getFocusableElements : Returns a list of focusable elements within a target, optionally also including the target (if it itself is also focusable)
 *
 * @param {HTMLElement} $target an HTML Element
 * @param {Boolean} includeTarget Whether or not to include the target itself in the returned array
 * @returns {Array} An array of focusable elements
 */
declare function getFocusableElements($target: HTMLElement, includeTarget?: boolean): any[];
