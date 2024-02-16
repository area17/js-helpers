import getFocusableElements from './getFocusableElements';

/**
 * setFocusOnTarget : move focus on the node
 *
 * @param {HTMLElement} $node an HTML Element
 * @param {Boolean} exact Tell if the focus should be set on the exact element or on the first focusable element inside it.
*/
var setFocusOnTarget = function($node, exact = true) {
  // Doc: https://github.com/area17/js-helpers/wiki/setFocusOnTarget

  if (!($node instanceof Element) && !($node instanceof Document)) {
    return;
  }

  if (exact) {
    $node.focus();
    if (document.activeElement !== $node) {
      $node.setAttribute('tabindex','-1');
      $node.focus({ preventScroll: true });
      $node.removeAttribute('tabindex');
    }
  } else {
    const $focusable = getFocusableElements($node, true)[0] || $node;
    if ($focusable) {
      $focusable.focus({ preventScroll: true });
    } else {
      $node.setAttribute('tabindex','-1');
      $node.focus({ preventScroll: true });
      $node.removeAttribute('tabindex');
    }
  }
}

export default setFocusOnTarget;
