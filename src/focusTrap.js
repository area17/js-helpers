export function focusTrap() {

  let element;

  function _focus() {
    if (element) {
      if (document.activeElement !== element && !element.contains(document.activeElement)) {
        setTimeout(function(){
          element.focus();
          if (element !== document.activeElement) {
            let focusable = element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            focusable[0].focus();
          }
        }, 0)
      }
    } else {
      try {
        document.removeEventListener('focus', _focus);
      } catch(err) {}
    }
  }

  function _trap(event) {
    try {
      document.removeEventListener('focus', _focus);
    } catch(err) {}

    if (!event && !event.detail.element) {
      return;
    }

    element = event.detail.element;
    document.addEventListener('focus', _focus, true);
  }

  function _untrap() {
    document.removeEventListener('focus', _focus);
    element = null;
  }

  document.addEventListener('focus:trap', _trap, false);
  document.addEventListener('focus:untrap', _untrap, false);
};

export focusTrap;
