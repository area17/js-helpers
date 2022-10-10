export function ios100vhFix() {
  // Doc: https://github.com/area17/a17-behaviors/wiki/ios100vhFix

  function setVh() {
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  window.addEventListener('resize', setVh);

  setVh();
};

export default ios100vhFix;
