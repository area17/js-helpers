import cookieHandler from './cookieHandler';
import FontFaceOnload from 'fontfaceonload';

var fontLoadObserver = function(fonts) {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/fontLoadObserver

  if ((typeof fonts).toLowerCase() !== 'object') {
    return false;
  }

  var counter = 0;
  var total = fonts.variants.length;

  // cookie name
  var cookieName = 'A17_fonts_cookie_'+fonts.name;

  // check we have cookie of fonts already loaded or not
  var cookie = cookieHandler.read(cookieName) || '';

  // when a fonts is determined to be loaded
  function loaded() {
    counter++;
    // if we reached the total
    if (counter >= total) {
      document.documentElement.className += ' s-'+fonts.name+'-loaded';
      cookieHandler.create(cookieName, total, 1);
      document.dispatchEvent(new CustomEvent('page:updated'));
    }
  }

  // if cookie, show fonts (not first page load)
  if (cookie && cookie === total.toString()) {
    counter = cookie;
    loaded();
  } else {
    for (var i = 0; i < total; i++) {
      FontFaceOnload(fonts.variants[i].name, {
        success: loaded,
        error: loaded,
        weight: fonts.variants[i].weight || '',
        timeout: 3000
      });
    }
  }
};

export default fontLoadObserver;
