import isVisible from './isVisible';

function focusableFilter($el) {
  // Doc: https://github.com/area17/a17-behaviors/wiki/focusableFilter

  // drop anything that is inert or lives inside something inert, has a tabindex -1 or isn't visible
  if ($el.closest('[inert]') || $el.getAttribute('tabindex') === '-1' || !isVisible($el)) {
    return false;
  }
  // drop any form elements that are disabled or are inside a disabled fieldset
  if ($el.tagName.match(/INPUT|SELECT|TEXTAREA|BUTTON/) && ($el.disabled || $el.closest('fieldset[disabled]'))) {
    return false;
  }
  // passes tests, return true
  return true;
}

var getFocusableElements = function($target, includeTarget = false) {
  if (!$target) {
    $target = document.body;
  }

  // get generally focusable elements
  const $focusable = $target.querySelectorAll('a[href], button, input, select, textarea, audio[controls], video[controls], [contenteditable]:not([contenteditable="false"]), details > summary:first-of-type, [tabindex]');
  // filter them
  let focusable = Array.from($focusable).filter($el => focusableFilter($el));
  // optionally add the target if it passes the test
  if (includeTarget && focusableFilter($target)) {
    focusable.unshift($target);
  }
  // return arr
  return focusable;
}

export default getFocusableElements;
