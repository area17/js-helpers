import getCurrentMediaQuery from './getCurrentMediaQuery';
import triggerCustomEvent from './triggerCustomEvent';

var resized = function() {
  // Doc: https://code.area17.com/mike/a17-js-helpers/wikis/A17-Helpers-resized

  var resizeTimer;
  var mediaQuery = getCurrentMediaQuery();

  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      // check media query
      var newMediaQuery = getCurrentMediaQuery();

      // tell everything resized happened
      triggerCustomEvent(document, 'resized');

      // if media query changed, tell everything
      if (newMediaQuery !== mediaQuery) {
        mediaQuery = newMediaQuery;
        if (window.A17) {
          window.A17.currentMediaQuery = newMediaQuery;
        }
        triggerCustomEvent(document, 'mediaQueryUpdated');
      }
    }, 250);
  });

};

export default resized;
