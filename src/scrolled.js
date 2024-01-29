var scrolled = function() {
  // Doc: https://github.com/area17/js-helpers/wiki/scrolled
  var lastScrollPos = 0;
  var prevScrollPos = -1;
  var ticking = false;

  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        lastScrollPos = window.pageYOffset;

        document.dispatchEvent(new CustomEvent('scrolled', {
          detail: {
            last: lastScrollPos,
            prev: prevScrollPos
          }
        }));

        prevScrollPos = lastScrollPos;
        ticking = false;
      });
    }
    ticking = true;
  });
};

export default scrolled;
