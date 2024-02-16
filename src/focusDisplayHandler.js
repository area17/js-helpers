/**
 * focusDisplayHandler : Adds data-focus-method to document.activeElement which differentiates between keyboard, mouse and touch focus - values of which can be touch, key or mouse. This allows you to style keyboard focus events and hide the focus ring for mouse events (because designers hate those!)
 */
const focusDisplayHandler = function() {
  // Doc: https://github.com/area17/js-helpers/wiki/focusDisplayHandler

  const attr = 'data-focus-method';
  const touch = 'touch';
  const mouse = 'mouse';
  const key = 'key';

  let focusMethod = '';
  let lastFocusMethod = '';

  function _onKeyDown() {
    focusMethod = key;
  }

  function _onMouseDown() {
    if (focusMethod === touch) {
        return;
    }
    focusMethod = mouse;
  }

  function _onTouchStart() {
    focusMethod = touch;
  }

  function _onFocus(event) {
    if (!focusMethod) {
      focusMethod = lastFocusMethod;
    }
    if (event.target && typeof(event.target.setAttribute) === 'function') {
      event.target.setAttribute(attr, focusMethod);
      lastFocusMethod = focusMethod;
      focusMethod = '';
    }
  }

  function _onBlur(event) {
    if (event.target && typeof(event.target.removeAttribute) === 'function') {
      event.target.removeAttribute(attr);
    }
  }

  function _onWindowBlur() {
    focusMethod = null;
  }

  document.addEventListener('keydown', _onKeyDown, true);
  document.addEventListener('mousedown', _onMouseDown, true);
  document.addEventListener('touchstart', _onTouchStart, true);
  document.addEventListener('focus', _onFocus, true);
  document.addEventListener('blur', _onBlur, true);
  window.addEventListener('blur', _onWindowBlur);
};

export default focusDisplayHandler;
