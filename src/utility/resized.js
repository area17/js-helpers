import getCurrentMediaQuery from './getCurrentMediaQuery';

var resized = function() {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/resized

  var resizeTimer;
  var mediaQuery = getCurrentMediaQuery();
  if (window.A17) {
    window.A17.currentMediaQuery = mediaQuery;
  }

  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
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
    }, 250);
  });
};

export default resized;
