import getCurrentMediaQuery from './getCurrentMediaQuery';

var resized = function() {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/resized

  var resizeTimer;
  var mediaQuery = getCurrentMediaQuery();

  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      // check media query
      var newMediaQuery = getCurrentMediaQuery();

      // tell everything resized happened
      window.dispatchEvent(new CustomEvent('resized'));

      // if media query changed, tell everything
      if (newMediaQuery !== mediaQuery) {
        mediaQuery = newMediaQuery;
        if (window.A17) {
          window.A17.currentMediaQuery = newMediaQuery;
        }
        window.dispatchEvent(new CustomEvent('mediaQueryUpdated'));
      }
    }, 250);
  });

};

export default resized;
