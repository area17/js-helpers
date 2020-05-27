export function responsiveImageUpdate() {

  // Safari doesn't reassess srcset with resize
  // see: https://bugs.webkit.org/show_bug.cgi?id=149899
  // So on resize or ajax, it might pick a lower resolution image
  // and never change unless you refresh the browser
  // The fix:
  // on resized (debounced resize) and page:updated
  // adding an empty string to the sizes attribute
  // which will force the engine to reassess
  // see: https://github.com/ausi/respimagelint/issues/31#issuecomment-420441005

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
