/**
 * scrolled : Dispatch a 'scrolled' event when the user scrolls the page
 * @example document.addEventListener('scrolled', function(event) { console.log(event.detail.last); });
*/
const scrolled = function() {
  // Doc: https://github.com/area17/js-helpers/wiki/scrolled
  let lastScrollPos = 0;
  let prevScrollPos = -1;
  let ticking = false;

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
