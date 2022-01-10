var queryStringHandler = {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/queryStringHandler-toObject
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/queryStringHandler-fromObject
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/queryStringHandler-updateParameter

  toObject(url) {
    /*
    URLSearchParams doesn't work in IE11 :-(
    https://caniuse.com/#search=URLSearchParams
    */

    if (typeof url !== 'string') {
      return {};
    }

    var qsObj = {};
    var search = (url && url.indexOf('?') > -1) ? url.split('?')[1] : location.search;
    search.replace(
      new RegExp('([^?=&]+)(=([^&]*))?', 'g'), function($0, $1, $2, $3) {
        qsObj[$1] = $3;
      }
    );
    return qsObj;
  },

  fromObject(obj) {
    var queryString = '';
    var count = 0;

    if (Object.getOwnPropertyNames(obj).length > 0) {
      queryString = '?';
      for (var key in obj) {
        if (!obj.hasOwnProperty(key)) {
          continue;
        }
        queryString += ((count > 0) ? '&' : '') + key + '=' + encodeURIComponent(obj[key]).replace(/[!'()*]/g, function(c) {
            return '%' + c.charCodeAt(0).toString(16);
        });
        count++;
      }
    }

    return queryString;
  },

  updateParameter(url, key, value) {
    var re = new RegExp('([?&])' + key + '=.*?(&|#|$)', 'i');
    if (url.match(re)) {
      return url.replace(re, '$1' + key + '=' + value + '$2');
    } else {
      var hash = '';
      if(url.indexOf('#') !== -1 ){
        hash = url.replace(/.*#/, '#');
        url = url.replace(/#.*/, '');
      }
      var separator = url.indexOf('?') !== -1 ? '&' : '?';
      return url + separator + key + '=' + value + hash;
    }
  }

};

var ajaxRequest = function(settings) {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/ajaxRequest

  // This is a modified version to accept a new sendJSON boolean
  // to send the request with the right content type and data

  var options = settings;
  var request = new XMLHttpRequest();
  var requestUrl = options.url;

  options.queryString = '';
  if (options.data !== undefined && !options.sendJSON) {
    if (queryStringHandler.fromObject) {
      options.queryString = queryStringHandler.fromObject(options.data);
    } else {
      throw new ReferenceError('Missing: queryStringHandler.fromObject');
    }
  }

  if (options.type !== 'POST') {
    requestUrl += (requestUrl.indexOf('?') > 0) ? options.queryString.replace('?', '&') : options.queryString;
  }

  request.open(options.type, requestUrl, true);

  request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  if (options.type === 'POST') {
    request.setRequestHeader('Content-Type', options.sendJSON ? 'application/json' : 'application/x-www-form-urlencoded; charset=UTF-8');
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

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {

      // Success!
      if ((typeof options.onSuccess).toLowerCase() === 'function') {
        options.onSuccess.call(this, request.responseText, request.status);
      }
    } else {
      if ((typeof options.onError).toLowerCase() === 'function') {
        options.onError.call(this, request.responseText, request.status);
      }
      console.log('We reached our target server, but it returned an error: '+request.statusText);
    }
  };

  request.onerror = function() {
    console.log('There was a connection error of some sort');
    if ((typeof options.onError).toLowerCase() === 'function') {
      options.onError.call(this, request.responseText, request.status);
    }
  };

  request.send((options.type === 'POST') ? (options.sendJSON ? options.data : options.queryString.replace('?', '')) : '');

  return request;
};

var cookieHandler = {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/cookieHandler-create
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/cookieHandler-delete
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/cookieHandler-read

  create(name, value, days) {
    var expires = '';
    if (days) {
      var date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      expires = '; expires='+date.toGMTString();
    }
    document.cookie = name+'='+value+expires+'; path=/';
  },
  delete(name) {
    if (name) {
      this.create(name, '', -1);
    }
  },
  read(name) {
    if (name) {
      var nameEQ = name + '=';
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
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

var copyTextToClipboard = function(textToCopy,successMsg) {

  // https://code.area17.com/a17/a17-helpers/wikis/copyTextToClipboard
  // http://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript#answer-30810322

  // and then
  // https://stackoverflow.com/questions/47879184/document-execcommandcopy-not-working-on-chrome?rq=1&utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
  // https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa

  if (navigator.clipboard && ('Promise' in window) && window.location.protocol == 'https:') {
    navigator.clipboard.writeText(textToCopy).then(function() {
      console.log(successMsg);
    }, function(err) {
      console.error('Could not copy text: ', err);
    });
  } else {
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

    //textArea.value = textToCopy;
    textArea.textContent = textToCopy;
    document.body.appendChild(textArea);

    var selection = document.getSelection();
    var range = document.createRange();
    range.selectNode(textArea);
    selection.removeAllRanges();
    selection.addRange(range);

    try {
      var successful = document.execCommand('copy');
      if (successful) {
        window.alert(successMsg || 'Copied to clipboard');
      } else {
        console.log('Could not copy text');
      }
    } catch (err) {
      console.log('Could not copy text');
    }

    document.body.removeChild(textArea);
  }
};

var debounce = function(func, wait, immediate) {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/debounce
  var timeout;
  return function() {
    var context = this;
    var args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    var callNow = (immediate && !timeout);
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
};

var escapeString = function(str) {
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

var extend = function () {
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

var focusDisplayHandler = function() {

  // Doc: https://code.area17.com/a17/a17-helpers/wikis/focusDisplayHandler

  var attr = 'data-focus-method';
  var touch = 'touch';
  var mouse = 'mouse';
  var key = 'key';

  var focusMethod = false;
  var lastFocusMethod;

  function _onKeyDown() {
    focusMethod = key;
  }

  function _onMouseDown() {
    if (focusMethod === touch) {
        return;
    }
    focusMethod = mouse;
  }

  function _onTouchStart() {
    focusMethod = touch;
  }

  function _onFocus(event) {
    if (!focusMethod) {
      focusMethod = lastFocusMethod;
    }
    if (event.target && typeof(event.target.setAttribute) === 'function') {
      event.target.setAttribute(attr, focusMethod);
      lastFocusMethod = focusMethod;
      focusMethod = false;
    }
  }

  function _onBlur(event) {
    if (event.target && typeof(event.target.removeAttribute) === 'function') {
      event.target.removeAttribute(attr);
    }
  }

  function _onWindowBlur() {
    focusMethod = false;
  }

  document.addEventListener('keydown', _onKeyDown, true);
  document.addEventListener('mousedown', _onMouseDown, true);
  document.addEventListener('touchstart', _onTouchStart, true);
  document.addEventListener('focus', _onFocus, true);
  document.addEventListener('blur', _onBlur, true);
  window.addEventListener('blur', _onWindowBlur);

};

function focusTrap() {

  let element;

  function _focus() {
    if (element) {
      if (document.activeElement !== element && !element.contains(document.activeElement)) {
        setTimeout(function(){
          element.focus();
          if (element !== document.activeElement) {
            let focusable = element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            focusable[0].focus();
          }
        }, 0);
      }
    } else {
      try {
        document.removeEventListener('focus', _focus);
      } catch(err) {}
    }
  }

  function _trap(event) {
    try {
      document.removeEventListener('focus', _focus);
    } catch(err) {}

    if (!event && !event.detail.element) {
      return;
    }

    element = event.detail.element;
    document.addEventListener('focus', _focus, true);
  }

  function _untrap() {
    document.removeEventListener('focus', _focus);
    element = null;
  }

  document.addEventListener('focus:trap', _trap, false);
  document.addEventListener('focus:untrap', _untrap, false);
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var fontfaceonload = {exports: {}};

(function (module, exports) {
(function (root, factory) {
	{
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
}(fontfaceonload));

var FontFaceOnload = fontfaceonload.exports;

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

var getCurrentMediaQuery = function() {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/getCurrentMediaQuery

  return getComputedStyle(document.documentElement).getPropertyValue('--breakpoint').trim().replace(/"/g, '');
};

var getIndex = function (node, nodeList) {
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

var getMetaContentByName = function(name) {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/getMetaContentByName

  return document.querySelector('meta[name=\''+name+'\']').getAttribute('content');
};

var getOffset = function(node) {
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

var getUrlParameterByName = function(name, url) {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/getUrlParameterByName

  var qsObj = queryStringHandler.toObject(url || undefined);
  return (qsObj[name] !== undefined) ? qsObj[name] : undefined;
};

function ios100vhFix() {

  function setVh() {
    const vh = document.documentElement.clientHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  window.addEventListener('resize', setVh);

  setVh();
}

const isBreakpoint = function (breakpoint, breakpoints) {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/isBreakpoint

  // bail if no breakpoint is passed
  if (!breakpoint) {
    console.error('You need to pass a breakpoint name!');
    return false
  }

  // we only want to look for a specific modifier and make sure it is at the end of the string
  const regExp = new RegExp('\\+$|\\-$');

  // bps must be in order from smallest to largest
  let bps = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

  // override the breakpoints if the option is set on the global A17 object
  if (window.A17 && window.A17.breakpoints) {
    if (Array.isArray(window.A17.breakpoints)) {
      bps = window.A17.breakpoints;
    } else {
      console.warn('A17.breakpoints should be an array. Using defaults.');
    }
  }

  // override the breakpoints if a set of breakpoints is passed through as a parameter (added for A17-behaviors to allow usage with no globals)
  if (breakpoints) {
    if (Array.isArray(breakpoints)) {
      bps = breakpoints;
    } else {
      console.warn('isBreakpoint breakpoints should be an array. Using defaults.');
    }
  }

  // store current breakpoint in use
  const currentBp = getCurrentMediaQuery();

  // store the index of the current breakpoint
  const currentBpIndex = bps.indexOf(currentBp);

  // check to see if bp has a + or - modifier
  const hasModifier = regExp.exec(breakpoint);

  // store modifier value
  const modifier = hasModifier ? hasModifier[0] : false;

  // store the trimmed breakpoint name if a modifier exists, if not, store the full queried breakpoint name
  const bpName = hasModifier ? breakpoint.slice(0, -1) : breakpoint;

  // store the index of the queried breakpoint
  const bpIndex = bps.indexOf(bpName);

  // let people know if the breakpoint name is unrecognized
  if (bpIndex < 0) {
    console.warn(
      'Unrecognized breakpoint. Supported breakpoints are: ' + bps.join(', ')
    );
    return false
  }

  // compare the modifier with the index of the current breakpoint in the bps array with the index of the queried breakpoint.
  // if no modifier is set, compare the queried breakpoint name with the current breakpoint name
  if (
    (modifier === '+' && currentBpIndex >= bpIndex) ||
    (modifier === '-' && currentBpIndex <= bpIndex) ||
    (!modifier && breakpoint === currentBp)
  ) {
    return true
  }

  // the current breakpoint isn’t the one you’re looking for
  return false
};

var jsonpRequest = function(settings) {
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
  var timeout = setTimeout(function() {
    // wipe callback function
    window[options.data.callback] = function() {};

    // run error function if specified
    if ((typeof options.onError).toLowerCase() === 'function') {
      options.onError.call(this);
    }
  }, (options.timeout || 5) * 1000);

  // set up the callback
  window[options.data.callback] = function(data) {
    // no need to clear timeout
    clearTimeout(timeout);

    // run success function if specified
    if ((typeof options.onSuccess).toLowerCase() === 'function') {
      options.onSuccess.call(this, data);
    }
  };

  // append the script (or go go go!)
  document.getElementsByTagName('head')[0].appendChild(script);
};

var keyCodes = {
  tab:   9,
  enter: 13,
  esc:   27,
  space: 32,
  left:  37,
  up:    38,
  right: 39,
  down:  40
};

// A A17-helperised version of: https://github.com/area17/lazyload
// This version: v2.1.1 - 2018-04-01
// Doc: https://code.area17.com/a17/a17-helpers/wikis/lazyload

var lazyLoad = function(opts) {
  var options = {
    pageUpdatedEventName: 'page:updated', // how your app tells the rest of the app an update happened
    elements: 'img[data-src], img[data-srcset], source[data-srcset], iframe[data-src], video[data-src], [data-lazyload]', // maybe you just want images?
    rootMargin: '0px', // IntersectionObserver option
    threshold: 0, // IntersectionObserver option
    maxFrameCount: 10, // 60fps / 10 = 6 times a second
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
    el = (el.tagName === 'SOURCE') ? el.parentNode : el;
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
      el.setAttribute('data-lazyloaded','');
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
        threshold: options.threshold,
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
      } catch(err) {}
    } else if (checkType === 'new') {
      try {
        observer.disconnect();
      } catch(err) {}
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
    for(var item in opts) {
      if(opts.hasOwnProperty(item)) {
        options[item] = opts[item];
      }
    }
    if(!('addEventListener' in window) || !window.requestAnimationFrame || typeof document.body.getBoundingClientRect === undefined) {
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

var messages = function() {
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
    div.className = (type !== '') ? 'message message--'+type+' s-hide' : 'message s-hide';
    return div;
  }

  function hideMessage(div) {
    div.className += ' s-hide';
    setTimeout(function() {
      div.parentNode.removeChild(div);
    }, 250);
  }

  function showMessage(div, time) {
    messageVisible = true;
    target.appendChild(div);
    div.className = div.className.replace(new RegExp('(^|\\b)' + 's-hide'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    messageTimer = setTimeout(function() {
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

var objectifyForm = function(form) {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/objectifyForm

  var field;
  var obj = {};

  if (typeof form === 'object' && form.nodeName === 'FORM') {
    var len = form.elements.length;
    for (var i = 0; i < len; i++) {
      field = form.elements[i];
      if (field.name && !field.disabled && field.type !== 'file' && field.type !== 'reset' && field.type !== 'submit' && field.type !== 'button') {
        if (field.type === 'select-multiple') {
          for (var j = form.elements[i].options.length-1; j >= 0; j--) {
            if(field.options[j].selected) {
              obj[field.name] = field.options[j].value;
            }
          }
        } else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
          obj[field.name] = field.value;
        }
      }
    }
  }
  return obj;
};

var oritentationChangeFix = function() {
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

var purgeProperties = function(obj) {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/purgeProperties
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      delete obj[prop];
    }
  }

  // alternatives considered: https://jsperf.com/deleting-properties-from-an-object
};

var resized = function() {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/resized

  var resizeTimer;
  var mediaQuery = getCurrentMediaQuery();

  function informApp() {
    // check media query
    var newMediaQuery = getCurrentMediaQuery();

    // tell everything resized happened
    window.dispatchEvent(new CustomEvent('resized', {
      detail: {
        breakpoint: newMediaQuery
      }
    }));

    // if media query changed, tell everything
    if (newMediaQuery !== mediaQuery) {
      if (window.A17) {
        window.A17.currentMediaQuery = newMediaQuery;
      }
      window.dispatchEvent(new CustomEvent('mediaQueryUpdated', {
        detail: {
          breakpoint: newMediaQuery,
          prevBreakpoint: mediaQuery
        }
      }));
      mediaQuery = newMediaQuery;
    }
  }

  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(informApp, 250);
  });

  if (mediaQuery === '') {
    window.requestAnimationFrame(informApp);
  } else if (window.A17) {
    window.A17.currentMediaQuery = mediaQuery;
  }
};

function responsiveImageUpdate() {

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
}

var scrolled = function() {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/scrolled
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

var sendEventToSegmentio = function() {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/sentEventToSegmentio

  var analyticsReady = false;
  var tempStore = [];

  function pushAnalytics(data) {
    if (Object.getOwnPropertyNames(data).length > 0) {
      switch(data.type.toLowerCase()) {
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
    tempStore.forEach(function(obj, i) {
      pushAnalytics(obj);
      tempStore.splice(i, 1);
    });
  }

  function identify() {
    var userInfo = document.querySelector('meta[name=\''+name+'\']').getAttribute('content');
    if (userInfo) {
      userInfo = userInfo.split(',');
      var identifyProps = {};
      userInfo.forEach(function(item) {
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
    if (typeof analytics !== undefined) {
      analytics.ready(function() {
        analytics.debug(false);
        analyticsReady = true;
        identify();
        pushStored();
      });
    } else {
      setTimeout(init, 1000);
    }
  }

  document.addEventListener('analytics', function(event) {
    pushOrStore(event.detail);
  });

  document.addEventListener('analytics_identify', identify);

  init();

};

var setFocusOnTarget = function(node) {
  //https://code.area17.com/a17/a17-helpers/wikis/setFocusOnTarget
  node.focus();
  if (node!== document.activeElement) {
    node.setAttribute('tabindex','-1');
    node.focus();
    node.removeAttribute('tabindex');
  }
};

/*
  Based on of Beedle.js (with an unsubscribe mechanism inspired bv vuex)
  https://github.com/andy-piccalilli/beedle

  A demo is available here : http://bp7store.dev.area17.com/
*/

class Store {
  constructor(params) {
      const self = this;

      // Add some default objects to hold our actions, mutations and state
      self.actions = {};
      self.mutations = {};
      self.state = {};

      // A status enum to set during actions and mutations
      self.status = 'resting';

      // We store callbacks for when the state changes in here
      self.callbacks = [];

      // Look in the passed params object for actions and mutations
      // that might have been passed in
      if(params.hasOwnProperty('actions')) {
          self.actions = params.actions;
      }

      if(params.hasOwnProperty('mutations')) {
          self.mutations = params.mutations;
      }

      // Set our state to be a Proxy. We are setting the default state by
      // checking the params and defaulting to an empty object if no default
      // state is passed in
      self.state = new Proxy((params.initialState || {}), {
          set(state, key, value) {

              // Set the value as we would normally
              state[key] = value;

              // Fire off our callback processor because if there's listeners,
              // they're going to want to know that something has changed
              self.processCallbacks(self.state);

              // Reset the status ready for the next operation
              self.status = 'resting';

              return true;
          }
      });
  }

  /**
   * A dispatcher for actions that looks in the actions
   * collection and runs the action if it can find it
   *
   * @param {string} actionKey
   * @param {mixed} payload
   * @returns {boolean}
   * @memberof Store
   */
  dispatch(actionKey, payload) {

      const self = this;

      // Run a quick check to see if the action actually exists
      // before we try to run it
      if(typeof self.actions[actionKey] !== 'function') {
          console.error(`Action "${actionKey}" doesn't exist.`);
          return false;
      }

      // Let anything that's watching the status know that we're dispatching an action
      self.status = 'action';

      // Actually call the action and pass it the Store context and whatever payload was passed
      return self.actions[actionKey](self, payload);
  }

  /**
   * Look for a mutation and modify the state object
   * if that mutation exists by calling it
   *
   * @param {string} mutationKey
   * @param {mixed} payload
   * @returns {boolean}
   * @memberof Store
   */
  commit(mutationKey, payload) {
      const self = this;

      // Run a quick check to see if this mutation actually exists
      // before trying to run it
      if(typeof self.mutations[mutationKey] !== 'function') {
          console.error(`Mutation "${mutationKey}" doesn't exist`);
          return false;
      }

      // Let anything that's watching the status know that we're mutating state
      self.status = 'mutation';

      // Get a new version of the state by running the mutation and storing the result of it
      let newState = self.mutations[mutationKey](self.state, payload);

      // Update the old state with the new state returned from our mutation
      self.state = newState;

      return true;
  }

  /**
   * Fire off each callback that's run whenever the state changes
   * We pass in some data as the one and only parameter.
   * Returns a boolean depending if callbacks were found or not
   *
   * @param {object} data
   * @returns {boolean}
   */
  processCallbacks(data) {
      const self = this;

      if(!self.callbacks.length) {
          return false;
      }

      // We've got callbacks, so loop each one and fire it off
      self.callbacks.forEach(callback => callback(data));

      return true;
  }

  /**
   * Allow an outside entity to subscribe to state changes with a valid callback.
   * Returns a function to later unsubscribe
   *
   * Subscribe :
   * const unsubscribe = store.subscribe(render)
   *
   * Unsubscribe :
   * unsubscribe();
   *
   * @param {function} callback
   * @returns {function}
   */
  subscribe(callback) {
      const self = this;

      if(typeof callback !== 'function') {
          console.error('You can only subscribe to Store changes with a valid function');
          return false;
      }

      // A valid function, so it belongs in our collection
      self.callbacks.push(callback);

      const callbacksForUnsubscribe = self.callbacks;

      // Return a function to unsubscribe the callback
      return function unsubscribe() {
          const index = callbacksForUnsubscribe.indexOf(callback);
          callbacksForUnsubscribe.splice(index, 1);
      }
  }
}

const a17helpers = {
  ajaxRequest,
  cookieHandler,
  copyTextToClipboard,
  debounce,
  escapeString,
  extend,
  focusDisplayHandler,
  focusTrap,
  fontLoadObserver,
  getCurrentMediaQuery,
  getIndex,
  getMetaContentByName,
  getOffset,
  getUrlParameterByName,
  ios100vhFix,
  isBreakpoint,
  jsonpRequest,
  keycodes: keyCodes,
  lazyLoad,
  messages,
  objectifyForm,
  oritentationChangeFix,
  purgeProperties,
  queryStringHandler,
  resized,
  responsiveImageUpdate,
  scrolled,
  sendEventToSegmentio,
  setFocusOnTarget,
  Store
};

export { a17helpers as default };
