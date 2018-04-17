import queryStringHandler from './queryStringHandler';

var getUrlParameterByName = function(name, url) {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/getUrlParameterByName

  var qsObj = queryStringHandler.toObject(url || undefined);
  return (qsObj[name] !== undefined) ? qsObj[name] : undefined;
};

export default getUrlParameterByName;
