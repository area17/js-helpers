export function responsiveImageUpdate() {
  // Doc: https://github.com/area17/js-helpers/wiki/responsiveImageUpdate

  function update() {
    var sources = document.querySelectorAll('img[srcset][sizes], source[srcset][sizes]');
    for (var i = 0; i < sources.length; i++) {
      sources[i].sizes += '';
    }
  }

  window.addEventListener('resized', update);
  document.addEventListener('page:updated', update);
};

export default responsiveImageUpdate;
