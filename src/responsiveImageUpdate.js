export function responsiveImageUpdate() {

  // Doc: https://code.area17.com/a17/a17-helpers/wikis/responsiveImageUpdate

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
