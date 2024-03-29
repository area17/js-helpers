const queryStringHandler = {
  // Doc: https://github.com/area17/js-helpers/wiki/queryStringHandler-toObject
  // Doc: https://github.com/area17/js-helpers/wiki/queryStringHandler-fromObject
  // Doc: https://github.com/area17/js-helpers/wiki/queryStringHandler-updateParameter

  /**
   * Convert a query string to an object
   *
   * @param {string} url - The string to convert.
   * @returns {object} - Returns the converted object.
  */
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

  /**
   * Convert an object to a query string
   *
   * @param {Object} obj - The object to convert.
   * @returns {string} - Returns the converted string.
  */
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

  /**
   * Update a query string parameter
   *
   * @param {string} url - The string to update
   * @param {string} key - The key to update, if the key doesn't exist, it gets added
   * @param {string} value - The new value to update, can handle ''
   * @returns {string} - Returns the updated string.
  */
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

export default queryStringHandler;
