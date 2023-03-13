var isVisible = function($el) {
  // Doc: https://github.com/area17/a17-behaviors/wiki/isVisible

  // March 2023 - surprisingly little documentation on `Element.checkVisibility()`
  // https://caniuse.com/mdn-api_element_checkvisibility
  if (typeof $el.checkVisibility === 'function') {
    return $el.checkVisibility({
      checkOpacity: true,
      checkVisibilityCSS: true
    });
  }
  // fallback - Safari doesn't support `Element.checkVisibility()`
  // https://stackoverflow.com/questions/19669786/check-if-element-is-visible-in-dom/72717388#answer-59096915
  // https://jsfiddle.net/crisc2000/79uzoj4v/
  // NB - use of `getComputedStyle` may make this slow
  // Hopefully Safari gets `Element.checkVisibility()` support soon...
  if ($el.getClientRects().length !== 0) {
    let computedStyle = getComputedStyle($el);
    if (computedStyle.visibility === 'hidden' || computedStyle.opacity < 0.1 || (computedStyle.overflow === 'hidden' && $el.clientHeight === 0)) {
      return false;
    }
    return true;
  }

  if ($el.getClientRects().length === 0) {
    return false;
  }

  return true;
}

export default isVisible;
