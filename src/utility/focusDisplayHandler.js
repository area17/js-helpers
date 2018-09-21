var focusDisplayHandler = function() {

  // Doc: https://code.area17.com/a17/a17-helpers/wikis/focusDisplayHandler

  var attr = 'data-focus-method';
  var touch = 'touch';
  var mouse = 'mouse';
  var key = 'key';

  var focusMethod = false;
  var lastFocusMethod;

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
      focusMethod = false;
    }
  }

  function _onBlur(event) {
    if (event.target && typeof(event.target.removeAttribute) === 'function') {
      event.target.removeAttribute(attr);
    }
  }

  function _onWindowBlur() {
    focusMethod = false;
  }

  document.addEventListener('keydown', _onKeyDown, true);
  document.addEventListener('mousedown', _onMouseDown, true);
  document.addEventListener('touchstart', _onTouchStart, true);
  document.addEventListener('focus', _onFocus, true);
  document.addEventListener('blur', _onBlur, true);
  window.addEventListener('blur', _onWindowBlur);

};

export default focusDisplayHandler;
