/**
 * Responsive Image Update
 * Safari doesn't reassess srcset with resize, see: https://bugs.webkit.org/show_bug.cgi?id=149899
 * Update responsive images when the window is resized
 */
export function responsiveImageUpdate() {
  // Doc: https://github.com/area17/js-helpers/wiki/responsiveImageUpdate

  function update() {
    const sources = document.querySelectorAll('img[srcset][sizes], source[srcset][sizes]');
    for (let i = 0; i < sources.length; i++) {
      sources[i].sizes += '';
    }
  }

  window.addEventListener('resized', update);
  document.addEventListener('page:updated', update);
};

export default responsiveImageUpdate;
