export default setFocusOnTarget;
/**
 * setFocusOnTarget : move focus on the node
 *
 * @param {HTMLElement} $node an HTML Element
 * @param {Boolean} exact Tell if the focus should be set on the exact element or on the first focusable element inside it.
*/
declare function setFocusOnTarget($node: HTMLElement, exact?: boolean): void;
