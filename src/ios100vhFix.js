/**
 * ios100vhFix : Create a CSS variable --vh representing 1% of the window height to fix the 100vh issue on iOS
 */
const ios100vhFix = function () {
  // Doc: https://github.com/area17/js-helpers/wiki/ios100vhFix
  if(typeof window === 'undefined') return;

  function setVh() {
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  window.addEventListener('resize', setVh);

  setVh();
};

export default ios100vhFix;
