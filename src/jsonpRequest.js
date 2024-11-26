import queryStringHandler from './queryStringHandler.js';

/**
 * isBreakpoint : Performs jsonp requests - by writing script tags into the page and setting up the callback function to run on success
 *
 * @param {Object} settings required - settings object
 * @returns {void}
 */
const jsonpRequest = function(settings) {
  // Doc: https://github.com/area17/js-helpers/wiki/jsonpRequest

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

export default jsonpRequest;
