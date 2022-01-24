var queryStringHandler = {
  // Doc: https://github.com/area17/a17-behaviors/wiki/queryStringHandler-toObject
  // Doc: https://github.com/area17/a17-behaviors/wiki/queryStringHandler-fromObject
  // Doc: https://github.com/area17/a17-behaviors/wiki/queryStringHandler-updateParameter

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

export default queryStringHandler;
