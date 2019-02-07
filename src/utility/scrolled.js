import triggerCustomEvent from './triggerCustomEvent';

var scrolled = function() {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/scrolled
  var lastScrollPos = 0;
  var prevScrollPos = -1;
  var ticking = false;

  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        lastScrollPos = window.pageYOffset;

        triggerCustomEvent(document,'scrolled', {
          last:lastScrollPos,
          prev:prevScrollPos
        });

        prevScrollPos = lastScrollPos;
        ticking = false;
      });
    }
    ticking = true;
  });
};

export default scrolled;