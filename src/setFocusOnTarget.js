import getFocusableElements from './getFocusableElements';

var setFocusOnTarget = function($node, exact = true) {
  // Doc: https://github.com/area17/a17-behaviors/wiki/setFocusOnTarget

  if (!($node instanceof Element) && !($node instanceof HTMLDocument)) {
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
