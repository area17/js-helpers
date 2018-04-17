'use strict';

var queryStringHandler = {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/queryStringHandler-toObject
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/queryStringHandler-fromObject
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/queryStringHandler-updateParameter

  toObject: function toObject(url) {
    if (typeof url !== 'string') {
      return {};
    }

    var qsObj = {};
    var search = url && url.indexOf('?') > -1 ? url.split('?')[1] : location.search;
    search.replace(new RegExp('([^?=&]+)(=([^&]*))?', 'g'), function ($0, $1, $2, $3) {
      qsObj[$1] = $3;
    });
    return qsObj;
  },
  fromObject: function fromObject(obj) {
    var queryString = '';
    var count = 0;

    if (Object.getOwnPropertyNames(obj).length > 0) {
      queryString = '?';
      for (var key in obj) {
        if (!obj.hasOwnProperty(key)) {
          continue;
        }
        queryString += (count > 0 ? '&' : '') + key + '=' + encodeURIComponent(obj[key]).replace(/[!'()]/g, '').replace(/\*/g, '%2A').replace(/%2B/ig, '+');
        count++;
      }
    }

    return queryString;
  },
  updateParameter: function updateParameter(url, key, value) {
    var re = new RegExp('([?&])' + key + '=.*?(&|#|$)', 'i');
    if (url.match(re)) {
      return url.replace(re, '$1' + key + '=' + value + '$2');
    } else {
      var hash = '';
      if (url.indexOf('#') !== -1) {
        hash = url.replace(/.*#/, '#');
        url = url.replace(/#.*/, '');
      }
      var separator = url.indexOf('?') !== -1 ? '&' : '?';
      return url + separator + key + '=' + value + hash;
    }
  }
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var ajaxRequest = function ajaxRequest(settings) {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/ajaxRequest

  var options = settings;
  var request = new XMLHttpRequest();
  var requestUrl = options.url;

  options.queryString = '';
  if (options.data !== undefined) {
    if (queryStringHandler.fromObject) {
      options.queryString = queryStringHandler.fromObject(options.data);
    } else {
      throw new ReferenceError('Missing: queryStringHandler.fromObject');
    }
  }

  if (options.type !== 'POST') {
    requestUrl += requestUrl.indexOf('?') > 0 ? options.queryString.replace('?', '&') : options.queryString;
  }

  request.open(options.type, requestUrl, true);

  request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  if (options.type === 'POST') {
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  }

  if (options.requestHeaders !== undefined && options.requestHeaders.length > 0) {
    for (var i = 0; i < options.requestHeaders.length; i++) {
      var header = options.requestHeaders[i].header;
      var value = options.requestHeaders[i].value;
      if (header !== undefined && value !== undefined) {
        request.setRequestHeader(header, value);
      }
    }
  }

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {

      // Success!
      if (_typeof(options.onSuccess).toLowerCase() === 'function') {
        options.onSuccess.call(this, request.responseText, request.status);
      }
    } else {
      if (_typeof(options.onError).toLowerCase() === 'function') {
        options.onError.call(this, request.responseText, request.status);
      }
      console.log('We reached our target server, but it returned an error: ' + request.statusText);
    }
  };

  request.onerror = function () {
    console.log('There was a connection error of some sort');
    if (_typeof(options.onError).toLowerCase() === 'function') {
      options.onError.call(this, request.responseText, request.status);
    }
  };

  request.send(options.type === 'POST' ? options.queryString.replace('?', '') : '');
};

var cookieHandler = {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/cookieHandler-create
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/cookieHandler-delete
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/cookieHandler-read

  create: function create(name, value, days) {
    var expires = '';
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toGMTString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
  },
  delete: function _delete(name) {
    if (name) {
      this.create(name, '', -1);
    }
  },
  read: function read(name) {
    if (name) {
      var nameEQ = name + '=';
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
          return c.substring(nameEQ.length, c.length);
        }
      }
      return null;
    }
    return null;
  }
};

var copyTextToClipboard = function copyTextToClipboard(textToCopy, successMsg) {

  // https://code.area17.com/a17/a17-helpers/wikis/copyTextToClipboard
  // http://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript#answer-30810322

  var textArea = document.createElement('textarea');

  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;
  textArea.style.width = '2em';
  textArea.style.height = '2em';
  textArea.style.padding = 0;
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';
  textArea.style.background = 'transparent';

  textArea.value = textToCopy;

  document.body.appendChild(textArea);

  textArea.select();

  try {
    var successful = document.execCommand('copy');
    if (successful) {
      window.alert(successMsg || 'Copied to clipboard');
    } else {
      console.log('Oops, unable to copy');
    }
  } catch (err) {
    console.log('Oops, unable to copy');
  }

  document.body.removeChild(textArea);
};

var debounce = function debounce(func, wait, immediate) {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/debounce
  var timeout;
  return function () {
    var context = this;
    var args = arguments;
    var later = function later() {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
};

var escapeString = function escapeString(str) {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/escapeString

  if (typeof str === 'string') {
    var div = document.createElement('div');
    var text = document.createTextNode(str.replace(/<[^>]*>?/g, ''));
    div.appendChild(text);
    return encodeURIComponent(div.textContent);
  } else {
    return '';
  }
};

var extend = function extend() {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/extend

  var obj = {};
  var i = 0;
  var argumentsLength = arguments.length;
  var key;

  for (; i < argumentsLength; i++) {
    for (key in arguments[i]) {
      if (arguments[i].hasOwnProperty(key)) {
        obj[key] = arguments[i][key];
      }
    }
  }

  return obj;
};

var triggerCustomEvent = function triggerCustomEvent(el, type, data) {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/triggerCustomEvent

  var event = document.createEvent('HTMLEvents');
  event.initEvent(type, true, true);
  event.data = data || {};
  event.eventName = type;
  el.dispatchEvent(event);
};

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var fontfaceonload = createCommonjsModule(function (module, exports) {
(function (root, factory) {
	if (typeof undefined === 'function' && undefined.amd) {
		// AMD. Register as an anonymous module.
		undefined([], factory);
	} else {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory();
	}
}(commonjsGlobal, function () {

	var TEST_STRING = 'AxmTYklsjo190QW',
		SANS_SERIF_FONTS = 'sans-serif',
		SERIF_FONTS = 'serif',

		defaultOptions = {
			tolerance: 2, // px
			delay: 100,
			glyphs: '',
			success: function() {},
			error: function() {},
			timeout: 5000,
			weight: '400', // normal
			style: 'normal',
			window: window
		},

		// See https://github.com/typekit/webfontloader/blob/master/src/core/fontruler.js#L41
		style = [
			'display:block',
			'position:absolute',
			'top:-999px',
			'left:-999px',
			'font-size:48px',
			'width:auto',
			'height:auto',
			'line-height:normal',
			'margin:0',
			'padding:0',
			'font-variant:normal',
			'white-space:nowrap'
		],
		html = '<div style="%s" aria-hidden="true">' + TEST_STRING + '</div>';

	var FontFaceOnloadInstance = function() {
		this.fontFamily = '';
		this.appended = false;
		this.serif = undefined;
		this.sansSerif = undefined;
		this.parent = undefined;
		this.options = {};
	};

	FontFaceOnloadInstance.prototype.getMeasurements = function () {
		return {
			sansSerif: {
				width: this.sansSerif.offsetWidth,
				height: this.sansSerif.offsetHeight
			},
			serif: {
				width: this.serif.offsetWidth,
				height: this.serif.offsetHeight
			}
		};
	};

	FontFaceOnloadInstance.prototype.load = function () {
		var startTime = new Date(),
			that = this,
			serif = that.serif,
			sansSerif = that.sansSerif,
			parent = that.parent,
			appended = that.appended,
			dimensions,
			options = that.options,
			ref = options.reference;

		function getStyle( family ) {
			return style
				.concat( [ 'font-weight:' + options.weight, 'font-style:' + options.style ] )
				.concat( "font-family:" + family )
				.join( ";" );
		}

		var sansSerifHtml = html.replace( /\%s/, getStyle( SANS_SERIF_FONTS ) ),
			serifHtml = html.replace( /\%s/, getStyle(  SERIF_FONTS ) );

		if( !parent ) {
			parent = that.parent = options.window.document.createElement( "div" );
		}

		parent.innerHTML = sansSerifHtml + serifHtml;
		sansSerif = that.sansSerif = parent.firstChild;
		serif = that.serif = sansSerif.nextSibling;

		if( options.glyphs ) {
			sansSerif.innerHTML += options.glyphs;
			serif.innerHTML += options.glyphs;
		}

		function hasNewDimensions( dims, el, tolerance ) {
			return Math.abs( dims.width - el.offsetWidth ) > tolerance ||
				Math.abs( dims.height - el.offsetHeight ) > tolerance;
		}

		function isTimeout() {
			return ( new Date() ).getTime() - startTime.getTime() > options.timeout;
		}

		(function checkDimensions() {
			if( !ref ) {
				ref = options.window.document.body;
			}
			if( !appended && ref ) {
				ref.appendChild( parent );
				appended = that.appended = true;

				dimensions = that.getMeasurements();

				// Make sure we set the new font-family after we take our initial dimensions:
				// handles the case where FontFaceOnload is called after the font has already
				// loaded.
				sansSerif.style.fontFamily = that.fontFamily + ', ' + SANS_SERIF_FONTS;
				serif.style.fontFamily = that.fontFamily + ', ' + SERIF_FONTS;
			}

			if( appended && dimensions &&
				( hasNewDimensions( dimensions.sansSerif, sansSerif, options.tolerance ) ||
				hasNewDimensions( dimensions.serif, serif, options.tolerance ) ) ) {

				options.success();
			} else if( isTimeout() ) {
				options.error();
			} else {
				if( !appended && "requestAnimationFrame" in options.window ) {
					options.window.requestAnimationFrame( checkDimensions );
				} else {
					options.window.setTimeout( checkDimensions, options.delay );
				}
			}
		})();
	}; // end load()

	FontFaceOnloadInstance.prototype.cleanFamilyName = function( family ) {
		return family.replace( /[\'\"]/g, '' ).toLowerCase();
	};

	FontFaceOnloadInstance.prototype.cleanWeight = function( weight ) {
		// lighter and bolder not supported
		var weightLookup = {
			normal: '400',
			bold: '700'
		};

		return '' + (weightLookup[ weight ] || weight);
	};

	FontFaceOnloadInstance.prototype.checkFontFaces = function( timeout ) {
		var _t = this;
		_t.options.window.document.fonts.forEach(function( font ) {
			if( _t.cleanFamilyName( font.family ) === _t.cleanFamilyName( _t.fontFamily ) &&
				_t.cleanWeight( font.weight ) === _t.cleanWeight( _t.options.weight ) &&
				font.style === _t.options.style ) {
				font.load().then(function() {
					_t.options.success( font );
					_t.options.window.clearTimeout( timeout );
				});
			}
		});
	};

	FontFaceOnloadInstance.prototype.init = function( fontFamily, options ) {
		var timeout;

		for( var j in defaultOptions ) {
			if( !options.hasOwnProperty( j ) ) {
				options[ j ] = defaultOptions[ j ];
			}
		}

		this.options = options;
		this.fontFamily = fontFamily;

		// For some reason this was failing on afontgarde + icon fonts.
		if( !options.glyphs && "fonts" in options.window.document ) {
			if( options.timeout ) {
				timeout = options.window.setTimeout(function() {
					options.error();
				}, options.timeout );
			}

			this.checkFontFaces( timeout );
		} else {
			this.load();
		}
	};

	var FontFaceOnload = function( fontFamily, options ) {
		var instance = new FontFaceOnloadInstance();
		instance.init(fontFamily, options);

		return instance;
	};

	return FontFaceOnload;
}));
});

var fontLoadObserver = function fontLoadObserver(fonts) {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/fontLoadObserver

  if ((typeof fonts === 'undefined' ? 'undefined' : _typeof(fonts)).toLowerCase() !== 'object') {
    return false;
  }

  var counter = 0;
  var total = fonts.variants.length;

  // cookie name
  var cookieName = 'A17_fonts_cookie_' + fonts.name;

  // check we have cookie of fonts already loaded or not
  var cookie = cookieHandler.read(cookieName) || '';

  // when a fonts is determined to be loaded
  function loaded() {
    counter++;
    // if we reached the total
    if (counter >= total) {
      document.documentElement.className += ' s-' + fonts.name + '-loaded';
      cookieHandler.create(cookieName, total, 1);
      triggerCustomEvent(document, 'content:populated');
    }
  }

  // if cookie, show fonts (not first page load)
  if (cookie && cookie === total.toString()) {
    counter = cookie;
    loaded();
  } else {
    for (var i = 0; i < total; i++) {
      fontfaceonload(fonts.variants[i].name, {
        success: loaded,
        error: loaded,
        weight: fonts.variants[i].weight || '',
        timeout: 3000
      });
    }
  }
};

var forEach = function forEach(array, callback, scope) {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/forEach
  for (var i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]);
  }
};

var getCurrentMediaQuery = function getCurrentMediaQuery() {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/getCurrentMediaQuery

  function parse(str) {
    return str.replace(/'/gi, '').replace(/"/gi, '');
  }

  if (window.opera) {
    return parse(window.getComputedStyle(document.body, ':after').getPropertyValue('content')) || 'large';
  } else if (window.getComputedStyle) {
    return parse(window.getComputedStyle(document.head, null).getPropertyValue('font-family')) || 'large';
  } else {
    return 'large';
  }
};

var getIndex = function getIndex(node, nodeList) {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/getIndex

  var nodes = nodeList || node.parentNode.childNodes;
  var nodesLength = nodes.length;
  var n = 0;

  for (var i = 0; i < nodesLength; i++) {
    if (nodes[i] === node) {
      return n;
    }
    if (nodes[i].nodeType === 1) {
      n++;
    }
  }

  return -1;
};

var getMetaContentByName = function getMetaContentByName(name) {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/getMetaContentByName

  return document.querySelector('meta[name=\'' + name + '\']').getAttribute('content');
};

var getOffset = function getOffset(node) {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/getOffset

  if (node) {
    var rect = node.getBoundingClientRect();
    return {
      top: rect.top + (document.documentElement.scrollTop || document.body.scrollTop),
      left: rect.left + (document.documentElement.scrollLeft || document.body.scrollLeft),
      bottom: rect.bottom + (document.documentElement.scrollTop || document.body.scrollTop),
      right: rect.right + (document.documentElement.scrollLeft || document.body.scrollLeft),
      width: rect.width,
      height: rect.height
    };
  } else {
    return null;
  }
};

var getUrlParameterByName = function getUrlParameterByName(name, url) {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/getUrlParameterByName

  var qsObj = queryStringHandler.toObject(url || undefined);
  return qsObj[name] !== undefined ? qsObj[name] : undefined;
};

var jsonpRequest = function jsonpRequest(settings) {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/jsonpRequest

  var options = settings;
  var script = document.createElement('script');

  // sort out the data object
  options.data = options.data || {};
  options.data.callback = options.callback || 'callback';

  // make a query string from the data objects
  options.queryString = '';
  if (options.data !== undefined) {
    if (queryStringHandler.fromObject) {
      options.queryString = queryStringHandler.fromObject(options.data);
    } else {
      console.log('Missing: queryStringHandler.fromObject');
    }
  }

  // give the script some attributes
  script.type = 'text/javascript';
  script.src = options.url + options.queryString;

  // look for timeouts
  var timeout = setTimeout(function () {
    // wipe callback function
    window[options.data.callback] = function () {};

    // run error function if specified
    if (_typeof(options.onError).toLowerCase() === 'function') {
      options.onError.call(this);
    }
  }, (options.timeout || 5) * 1000);

  // set up the callback
  window[options.data.callback] = function (data) {
    // no need to clear timeout
    clearTimeout(timeout);

    // run success function if specified
    if (_typeof(options.onSuccess).toLowerCase() === 'function') {
      options.onSuccess.call(this, data);
    }
  };

  // append the script (or go go go!)
  document.getElementsByTagName('head')[0].appendChild(script);
};

var keyCodes = {
  tab: 9,
  enter: 13,
  esc: 27,
  space: 32,
  left: 37,
  up: 38,
  right: 39,
  down: 40
};

// A A17-helperised version of: https://github.com/area17/lazyload
// This version: v2.1.1 - 2018-04-01
// Doc: https://code.area17.com/a17/a17-helpers/wikis/lazyload

var lazyLoad = function lazyLoad(opts) {
  var options = {
    pageUpdatedEventName: 'page:updated', // how your app tells the rest of the app an update happened
    elements: 'img[data-src], img[data-srcset], source[data-srcset], iframe[data-src], video[data-src], [data-lazyload]', // maybe you just want images?
    rootMargin: '0px', // IntersectionObserver option
    threshold: 0, // IntersectionObserver option
    maxFrameCount: 10 // 60fps / 10 = 6 times a second
  };

  // set up
  var frameLoop;
  var frameCount;
  var els = [];
  var elsLength;
  var observer;
  var checkType;

  /**
   * Converts HTML collections to an array
   * @private
   * @param {Array} array to convert
   * a loop will work in more browsers than the slice method
   */
  function _htmlCollectionToArray(collection) {
    var a = [];
    var i = 0;
    for (a = [], i = collection.length; i;) {
      a[--i] = collection[i];
    }
    return a;
  }

  /**
   * Checks if an element is in the viewport
   * @private
   * @param {Node} element to check.
   * @returns {Boolean} true/false.
   */
  function _elInViewport(el) {
    el = el.tagName === 'SOURCE' ? el.parentNode : el;
    var rect = el.getBoundingClientRect();
    return rect.bottom > 0 && rect.right > 0 && rect.left < (window.innerWidth || document.documentElement.clientWidth) && rect.top < (window.innerHeight || document.documentElement.clientHeight);
  }

  /**
   * Removes data- attributes
   * @private
   * @param {Node} element to update
   */
  function _removeDataAttrs(el) {
    el.removeAttribute('data-src');
    el.removeAttribute('data-srcset');
    el.removeAttribute('data-lazyload');
  }

  /**
   * On loaded, removes event listener, removes data- attributes
   * @private
   */
  function _loaded() {
    this.removeEventListener('load', _loaded);
    _removeDataAttrs(this);
  }

  /**
   * Update an element
   * @private
   * @param {Node} element to update
   */
  function _updateEl(el) {
    var srcset = el.getAttribute('data-srcset');
    var src = el.getAttribute('data-src');
    var dlazyload = el.getAttribute('data-lazyload') !== null;
    //
    if (srcset) {
      // if source set, update and try picturefill
      el.setAttribute('srcset', srcset);
      if (window.picturefill) {
        window.picturefill({
          elements: [el]
        });
      }
    }
    if (src) {
      // if source set, update
      el.src = src;
    }
    if (dlazyload) {
      el.setAttribute('data-lazyloaded', '');
      el.removeEventListener('load', _loaded);
      _removeDataAttrs(el);
    }
  }

  /**
   * The callback from the IntersectionObserver
   * @private
   * @entries {Nodes} elements being observed by the IntersectionObserver
   */
  function _intersection(entries) {
    // Disconnect if we've already loaded all of the images
    if (elsLength === 0) {
      observer.disconnect();
    }
    // Loop through the entries
    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];
      // Are we in viewport?
      if (entry.intersectionRatio > 0) {
        elsLength--;
        // Stop watching this and load the image
        observer.unobserve(entry.target);
        entry.target.addEventListener('load', _loaded, false);
        _updateEl(entry.target);
      }
    }
  }

  /**
   * Loops images, checks if in viewport, updates src/src-set
   * @private
   */
  function _setSrcs() {
    var i;
    // browser capability check
    if (checkType === 'really-old') {
      elsLength = els.length;
      for (i = 0; i < elsLength; i++) {
        if (els[i]) {
          _updateEl(els[i]);
          _removeDataAttrs(els[i]);
        }
      }
      els = [];
    } else if (checkType === 'old') {
      // debounce checking
      if (frameCount === options.maxFrameCount) {
        // update cache of this for the loop
        elsLength = els.length;
        for (i = 0; i < elsLength; i++) {
          // check if this array item exists, hasn't been loaded already and is in the viewport
          if (els[i] && els[i].lazyloaded === undefined && _elInViewport(els[i])) {
            // cache this array item
            var thisEl = els[i];
            // set this array item to be undefined to be cleaned up later
            els[i] = undefined;
            // give this element a property to stop us running twice on one thing
            thisEl.lazyloaded = true;
            // add an event listener to remove data- attributes on load
            thisEl.addEventListener('load', _loaded, false);
            // update
            _updateEl(thisEl);
          }
        }
        // clean up array
        for (i = 0; i < elsLength; i++) {
          if (els[i] === undefined) {
            els.splice(i, 1);
          }
        }
        // reset var to decide if to continue running
        elsLength = els.length;
        // will shortly be set to 0 to start counting
        frameCount = -1;
      }

      // run again? kill if not
      if (elsLength > 0) {
        frameCount++;
        frameLoop = window.requestAnimationFrame(_setSrcs);
      }
    } else if (checkType === 'new') {
      observer = new IntersectionObserver(_intersection, {
        rootMargin: options.rootMargin,
        threshold: options.threshold
      });
      elsLength = els.length;
      for (i = 0; i < elsLength; i++) {
        if (els[i] && els[i].lazyloaded === undefined) {
          observer.observe(els[i]);
        }
      }
    }
  }

  /**
   * Gets the show on the road
   * @private
   */
  function _init() {
    // kill any old loops if there are any
    if (checkType === 'old') {
      try {
        cancelAnimationFrame(frameLoop);
      } catch (err) {}
    } else if (checkType === 'new') {
      try {
        observer.disconnect();
      } catch (err) {}
    }
    // grab elements to lazy load
    els = _htmlCollectionToArray(document.querySelectorAll(options.elements));
    elsLength = els.length;
    frameCount = options.maxFrameCount;
    // go go go
    _setSrcs();
  }

  /**
   * GO GO GO
   * @public
   * @param {object} options (see readme)
   */
  function _lazyLoad() {
    for (var item in opts) {
      if (opts.hasOwnProperty(item)) {
        options[item] = opts[item];
      }
    }
    if (!('addEventListener' in window) || !window.requestAnimationFrame || _typeof(document.body.getBoundingClientRect) === undefined) {
      checkType = 'really-old';
    } else if ('IntersectionObserver' in window) {
      checkType = 'new';
    } else {
      checkType = 'old';
    }
    _init();
    if (options.pageUpdatedEventName) {
      document.addEventListener(options.pageUpdatedEventName, _init, true);
    }
  }

  _lazyLoad();
};

// import * as Behaviors from '../behaviors';

var manageBehaviors = function manageBehaviors(Behaviors, options) {

  var activeBehaviors = {};

  /*
    default init listens for event 'page:updated':
    manageBehaviors();
     init for pjax:
    manageBehaviors({pageUpdatedEventName:'pjax:end'});
     init for spf:
    manageBehaviors({pageUpdatedEventName:'spfdone'});
  */

  var idCounter = 0;
  var pageUpdatedEventName = options && options.pageUpdatedEventName ? options.pageUpdatedEventName : 'page:updated';

  function searchDomAndInitBehaviors(context) {
    if (context === undefined) {
      context = document;
    }
    var all = context.querySelectorAll('[data-behavior]');
    var i = -1;
    while (all[++i]) {
      var currentElement = all[i];

      // check to see if this element has had its behaviors already initialized by looking for _A17BehaviorsActive
      if (!currentElement._A17BehaviorsActive) {
        //console.log('initializing behaviors for:\n', currentElement);
        var behaviors = currentElement.getAttribute('data-behavior');
        var splittedBehaviors = behaviors.split(' ');
        for (var j = 0, k = splittedBehaviors.length; j < k; j++) {
          var ThisBehavior = Behaviors[splittedBehaviors[j]];
          if (typeof ThisBehavior !== 'undefined') {
            try {
              // mark the element as having its behaviors initialized
              currentElement._A17BehaviorsActive = true;

              // add this instance to the activeBehaviors object so it can be interrogated if the page is updated later
              activeBehaviors[idCounter] = {
                el: currentElement,
                behavior: new ThisBehavior(currentElement),
                name: splittedBehaviors[j]
              };

              try {
                activeBehaviors[idCounter].behavior.init();
              } catch (err) {
                console.warn('failed to init behavior: ', activeBehaviors[idCounter].name, '\n', err, activeBehaviors[idCounter]);
              }

              idCounter++;
            } catch (err) {
              console.error(err, currentElement, ThisBehavior);
            }
          }
        }
      } else {

        //console.log('behaviors already initialized for:\n', currentElement);
      }
    }
  }

  function pageUpdated() {
    // first check if anything was removed and clean up
    for (var activeBehaviorObj in activeBehaviors) {
      if (activeBehaviors.hasOwnProperty(activeBehaviorObj)) {
        var thisBehaviorObj = activeBehaviors[activeBehaviorObj];

        // check if the element is still there
        if (!document.body.contains(thisBehaviorObj.el)) {
          //console.log('element no longer exists:\n', thisBehaviorObj.name, thisBehaviorObj);

          // trigger its destroy if its gone
          try {
            thisBehaviorObj.behavior.destroy();
            delete activeBehaviors[activeBehaviorObj];
          } catch (err) {
            //console.log('failed to destroy behavior: ', thisBehaviorObj.name, '\n', err, thisBehaviorObj);
          }
        } else {

            //console.log('element still exists:\n', thisBehaviorObj.name, thisBehaviorObj);
          }
      }
    }

    // now look for new behaviors!
    searchDomAndInitBehaviors();
  }

  searchDomAndInitBehaviors();
  document.addEventListener(pageUpdatedEventName, pageUpdated);
  document.addEventListener('content:updated', function () {
    searchDomAndInitBehaviors(event.data.el ? event.data.el : '');
  });
};

var messages = function messages() {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/messages

  var target = document.querySelectorAll('[data-message-target]');

  if (target.length > 0) {
    target = target[0];
  } else {
    return;
  }

  var messageVisible = false;
  var messageTimer;
  var messages = [];
  var loadMessage = target.getAttribute('data-message') || false;
  var loadMessageType = target.getAttribute('data-message-type') || '';

  function createMessage(message, type) {
    var div = document.createElement('div');
    var span = document.createElement('span');
    span.textContent = message;
    div.appendChild(span);
    div.className = type !== '' ? 'message message--' + type + ' s-hide' : 'message s-hide';
    return div;
  }

  function hideMessage(div) {
    div.className += ' s-hide';
    setTimeout(function () {
      div.parentNode.removeChild(div);
    }, 250);
  }

  function showMessage(div, time) {
    messageVisible = true;
    target.appendChild(div);
    div.className = div.className.replace(new RegExp('(^|\\b)' + 's-hide'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    messageTimer = setTimeout(function () {
      hideMessage(div);
      messageVisible = false;
      messages = [];
    }, time || 3000);
  }

  function newMessage(data) {
    messages.push(createMessage(data.data.message, data.data.type || ''));
    if (!messageVisible) {
      showMessage(messages[messages.length - 1], data.data.time || false);
    } else {
      clearTimeout(messageTimer);
      hideMessage(messages[messages.length - 2]);
      showMessage(messages[messages.length - 1], data.data.time || false);
    }
  }

  document.addEventListener('message', newMessage, false);

  if (loadMessage && loadMessage.length > 0) {
    var loadMessageData = {
      data: {
        message: loadMessage,
        time: 5000,
        type: loadMessageType
      }
    };
    newMessage(loadMessageData);
  }
};

var objectifyForm = function objectifyForm(form) {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/objectifyForm

  var field;
  var obj = {};

  if ((typeof form === 'undefined' ? 'undefined' : _typeof(form)) === 'object' && form.nodeName === 'FORM') {
    var len = form.elements.length;
    for (var i = 0; i < len; i++) {
      field = form.elements[i];
      if (field.name && !field.disabled && field.type !== 'file' && field.type !== 'reset' && field.type !== 'submit' && field.type !== 'button') {
        if (field.type === 'select-multiple') {
          for (var j = form.elements[i].options.length - 1; j >= 0; j--) {
            if (field.options[j].selected) {
              obj[field.name] = field.options[j].value;
            }
          }
        } else if (field.type !== 'checkbox' && field.type !== 'radio' || field.checked) {
          obj[field.name] = field.value;
        }
      }
    }
  }
  return obj;
};

var oritentationChangeFix = function oritentationChangeFix() {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/oritentationChangeFix

  if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
    var viewportmeta = document.querySelector('meta[name="viewport"]');
    if (viewportmeta) {
      viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0';
      document.body.addEventListener('gesturestart', function () {
        viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
      }, false);
    }
  }
};

var purgeProperties = function purgeProperties(obj) {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/purgeProperties
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      delete obj[prop];
    }
  }
};

var resized = function resized() {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/resized

  var resizeTimer;
  var mediaQuery = getCurrentMediaQuery();

  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      // check media query
      var newMediaQuery = getCurrentMediaQuery();

      // tell everything resized happened
      triggerCustomEvent(document, 'resized');

      // if media query changed, tell everything
      if (newMediaQuery !== mediaQuery) {
        mediaQuery = newMediaQuery;
        if (window.A17) {
          window.A17.currentMediaQuery = newMediaQuery;
        }
        triggerCustomEvent(document, 'mediaQueryUpdated');
      }
    }, 250);
  });
};

var scrollToY = function scrollToY(options) {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/scrollToY

  var settings = {
    el: document,
    offset: 0,
    duration: 250,
    easing: 'linear'
  };
  var start = Date.now();
  var from = 0;
  var isDocument = false;
  var easingEquations = {

    // Easing functions taken from: https://gist.github.com/gre/1650294
    // -
    // no easing, no acceleration
    linear: function linear(t) {
      return t;
    },

    // accelerating from zero velocity
    easeIn: function easeIn(t) {
      return t * t * t;
    },

    // decelerating to zero velocity
    easeOut: function easeOut(t) {
      return --t * t * t + 1;
    },

    // acceleration until halfway, then deceleration
    easeInOut: function easeInOut(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }
  };
  var useRequestAnimationFrame = window.requestAnimationFrame;
  var scrollInterval;

  for (var def in options) {
    if (typeof options[def] !== 'undefined') {
      settings[def] = options[def];
    }
  }

  if (settings.el === document) {
    isDocument = true;
    settings.el = document.documentElement.scrollTop ? document.documentElement : document.body;
  }

  from = settings.el.scrollTop;

  if (from === settings.offset) {
    // Prevent scrolling to the offset point if already there
    return;
  }

  function min(a, b) {
    return a < b ? a : b;
  }

  function cancelInterval() {
    if (useRequestAnimationFrame) {
      try {
        cancelAnimationFrame(scrollInterval);
      } catch (err) {
        // continue execution in case cancelAnimationFrame fails
      }
    } else {
      clearTimeout(scrollInterval);
    }
  }

  function scroll() {
    if (isDocument && from === 0) {
      // eugh Firefox! (https://miketaylr.com/posts/2014/11/document-body-scrollTop.html)
      document.documentElement.scrollTop = 1;
      document.body.scrollTop = 1;
      from = 1;
      settings.el = document.documentElement.scrollTop ? document.documentElement : document.body;
      requestAnimationFrame(scroll);
    } else {
      var currentTime = Date.now();
      var time = min(1, (currentTime - start) / settings.duration);
      var easedT = easingEquations[settings.easing](time);

      settings.el.scrollTop = easedT * (settings.offset - from) + from;

      if (time < 1) {
        doScroll();
      } else {
        cancelInterval();
        if (_typeof(settings.onComplete).toLowerCase() === 'function') {
          settings.onComplete.call(this);
        }
      }
    }
  }

  function doScroll() {
    if (useRequestAnimationFrame) {
      scrollInterval = requestAnimationFrame(scroll);
    } else {
      scrollInterval = setTimeout(function () {
        scroll();
      }, 1000 / 60);
    }
  }

  doScroll();
};

var sendEventToSegmentio = function sendEventToSegmentio() {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/sentEventToSegmentio

  var analyticsReady = false;
  var tempStore = [];

  function pushAnalytics(data) {
    if (Object.getOwnPropertyNames(data).length > 0) {
      switch (data.type.toLowerCase()) {
        case 'track':
          analytics.track(data.name, data.properties || {});
          break;
        case 'page':
          analytics.page(data.category || '', data.name || '', data.properties || {});
          break;
        case 'identify':
          analytics.identify(data.userID || '', data.properties || {});
          break;
      }
    }
  }

  function pushOrStore(data) {
    if (analyticsReady) {
      pushAnalytics(data);
    } else {
      tempStore.push(data);
    }
  }

  function pushStored() {
    tempStore.forEach(function (obj, i) {
      pushAnalytics(obj);
      tempStore.splice(i, 1);
    });
  }

  function identify() {
    var userInfo = document.querySelector('meta[name=\'' + name + '\']').getAttribute('content');
    if (userInfo) {
      userInfo = userInfo.split(',');
      var identifyProps = {};
      userInfo.forEach(function (item) {
        var pair = item.split(':');
        identifyProps[pair[0]] = pair[1];
      });
      pushOrStore({
        type: 'identify',
        userID: identifyProps.id || '',
        properties: identifyProps
      });
    }
  }

  function init() {
    if ((typeof analytics === 'undefined' ? 'undefined' : _typeof(analytics)) !== undefined) {
      analytics.ready(function () {
        analytics.debug(false);
        analyticsReady = true;
        identify();
        pushStored();
      });
    } else {
      setTimeout(init, 1000);
    }
  }

  document.addEventListener('analytics', function (event) {
    pushOrStore(event.data);
  });

  document.addEventListener('analytics_identify', identify);

  init();
};

var setFocusOnTarget = function setFocusOnTarget(node) {
  //https://code.area17.com/a17/a17-helpers/wikis/setFocusOnTarget
  node.focus();
  if (node !== document.activeElement) {
    node.setAttribute('tabindex', '-1');
    node.focus();
  }
};

var a17helpers = {
  ajaxRequest: ajaxRequest,
  cookieHandler: cookieHandler,
  copyTextToClipboard: copyTextToClipboard,
  debounce: debounce,
  escapeString: escapeString,
  extend: extend,
  fontLoadObserver: fontLoadObserver,
  forEach: forEach,
  getCurrentMediaQuery: getCurrentMediaQuery,
  getIndex: getIndex,
  getMetaContentByName: getMetaContentByName,
  getOffset: getOffset,
  getUrlParameterByName: getUrlParameterByName,
  jsonpRequest: jsonpRequest,
  keycodes: keyCodes,
  lazyLoad: lazyLoad,
  manageBehaviors: manageBehaviors,
  messages: messages,
  objectifyForm: objectifyForm,
  oritentationChangeFix: oritentationChangeFix,
  purgeProperties: purgeProperties,
  queryStringHandler: queryStringHandler,
  resized: resized,
  scrollToY: scrollToY,
  sendEventToSegmentio: sendEventToSegmentio,
  setFocusOnTarget: setFocusOnTarget,
  triggerCustomEvent: triggerCustomEvent
};

module.exports = a17helpers;
