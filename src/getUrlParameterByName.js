import queryStringHandler from './queryStringHandler'

var getUrlParameterByName = function(name, url) {
  // Doc: https://code.area17.com/mike/a17-js-helpers/wikis/A17-Helpers-getUrlParameterByName

  var qsObj = queryStringHandler.toObject(url || undefined);
  return (qsObj[name] !== undefined) ? qsObj[name] : undefined;
};

export default getUrlParameterByName;