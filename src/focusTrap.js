import getFocusableElements from './getFocusableElements.js';
import setFocusOnTarget from './setFocusOnTarget.js';

/**
 * focusTrap : Traps keyboard tabbing focus within a node
*/
const focusTrap = function() {
  // Doc: https://github.com/area17/js-helpers/wiki/focusTrap

  let $target;
  let $focusable = [];
  let mo;

  const handleKeyDown = (event) => {
    if (!$target) {
      return;
    }
    if (event.keyCode && event.keyCode === 9) {
      if (event.shiftKey) {
        // backwards
        if (document.activeElement.isEqualNode($focusable[0])) {
          setFocusOnTarget($focusable[$focusable.length - 1]);
          event.preventDefault();
        }
      } else {
        // forwards
        if (document.activeElement.isEqualNode($focusable[$focusable.length - 1])) {
          setFocusOnTarget($focusable[0]);
          event.preventDefault();
        }
      }
    }
  }

  const focusin = (event) => {
    if (!$target) {
      return;
    }
    if (document.activeElement !== $target && !$target.contains(document.activeElement)) {
      // catch focus some how escaped
      event.stopImmediatePropagation();
      event.preventDefault();
      setFocusOnTarget($focusable[0]);
    }
  }

  const trap = (event) => {
    try {
      document.removeEventListener('focusin', focusin, true);
      document.removeEventListener('keydown', handleKeyDown, true);
    } catch(err) {
      // continue regardless of error
    }
    $target = event.detail.el || event.detail.element || event.detail.target || event.detail.$target;
    if (!$target) {
      return;
    }
    $focusable = getFocusableElements($target);
    if ($focusable.length === 0) {
      $focusable = [$target];
    }
    mo = new MutationObserver(mutations => {
      $focusable = getFocusableElements($target);
    });
    mo.observe($target, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['inert', 'disabled', 'tabindex', 'hidden', 'style'],
      characterData: false,
    });
    document.addEventListener('focusin', focusin, true);
    document.addEventListener('keydown', handleKeyDown, true);
    setFocusOnTarget($focusable[0]);
    $target.dataset.focustrapped = 'true';
  };

  const untrap = () => {
    if (!$target) {
      return;
    }
    document.removeEventListener('focusin', focusin, true);
    document.removeEventListener('keydown', handleKeyDown, true);
    mo.disconnect();
    $target.removeAttribute('data-focustrapped');
    $target = null;
    $focusable = [];
    mo = null;
  };

  document.addEventListener('focus:trap', trap, false);
  document.addEventListener('focus:untrap', untrap, false);
};

export default focusTrap;
