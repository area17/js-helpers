import setFocusOnTarget from './setFocusOnTarget';

var focusTrap = function() {

  // Doc: https://code.area17.com/a17/a17-helpers/wikis/focusTrap

  var element;

  function _focus() {
    if (element) {
      if (document.activeElement !== element && !element.contains(document.activeElement)) {
        setFocusOnTarget(element);
      }
    } else {
      document.removeEventListener('focus', _trap);
    }
  }

  function _trap(event) {
    try {
      document.removeEventListener('focus', _focus);
    } catch(err) {}

    if (!event && !event.data.element) {
      return;
    }

    element = event.data.element;
    document.addEventListener('focus', _focus, true);
  }

  function _untrap() {
    document.removeEventListener('focus', _trap);
    element = null;
  }

  document.addEventListener('focus:trap', _trap, false);
  document.addEventListener('focus:untrap', _untrap, false);
};

export default focusTrap;
