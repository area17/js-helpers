import getCurrentMediaQuery from './getCurrentMediaQuery';

/**
 * resized : Debounces window resize, also checks if current media query has changed
 * @example document.addEventListener('resized', function(event) { console.log(event.detail.breakpoint); });
*/
const resized = function() {
  // Doc: https://github.com/area17/js-helpers/wiki/resized

  var resizeTimer;
  var resizedDelay = 250;
  var mediaQuery = getCurrentMediaQuery();

  function informApp() {
    // check media query
    var newMediaQuery = getCurrentMediaQuery();

    // tell everything resized happened
    window.dispatchEvent(new CustomEvent('resized', {
      detail: {
        breakpoint: newMediaQuery
      }
    }));

    // if media query changed, tell everything
    if (newMediaQuery !== mediaQuery) {
      if (window.A17) {
        window.A17.currentMediaQuery = newMediaQuery;
      }
      window.dispatchEvent(new CustomEvent('mediaQueryUpdated', {
        detail: {
          breakpoint: newMediaQuery,
          prevBreakpoint: mediaQuery
        }
      }));
      mediaQuery = newMediaQuery;
    }
  }

  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(informApp, resizedDelay);
  });

  // Firefox doesn't fire a `resize` event on text scaling
  // yet when doing so, its likely you'll cycle through your breakpoints
  // effectively you're resizing, even if the window doesn't change in dimensions
  // so, set up a `ResizeObserver` on the `document.documentElement` (the HTML tag)
  // and listen for it changing in someway and trigger a resize event
  //
  // the assumption being that your page will likely change in height
  // as the content resizes with a responsive layout
  // this isn't infallible...
  // its possible you have some sort of fixed height site
  if (typeof ResizeObserver === 'function') {
    let resizedTimer = null;
    const resizeObserver = new ResizeObserver((entries) => {
      clearTimeout(resizedTimer);
      resizedTimer = setTimeout(() => {
        if (window.A17.currentMediaQuery !== getCurrentMediaQuery()) {
          window.dispatchEvent(new Event('resize'));
        }
      }, resizedDelay + 1);
    });

    resizeObserver.observe(document.documentElement);
  }

  if (mediaQuery === '') {
    window.requestAnimationFrame(informApp);
  } else if (window.A17) {
    window.A17.currentMediaQuery = mediaQuery;
  }
};

export default resized;
