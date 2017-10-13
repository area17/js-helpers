var queryStringHandler = {
	// Doc: https://code.area17.com/mike/a17-js-helpers/wikis/A17-Helpers-turnObjectToQueryString
	// Doc: https://code.area17.com/mike/a17-js-helpers/wikis/A17-Helpers-turnQueryStringToObject

	toObject(url) {
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
				queryString += ((count > 0) ? '&' : '') + key + '=' + encodeURIComponent(obj[key]).replace(/[!'()]/g, '').replace(/\*/g, '%2A').replace(/%2B/ig, '+');
				count++;
			}
		}

		return queryString;
	}

};

export default queryStringHandler;