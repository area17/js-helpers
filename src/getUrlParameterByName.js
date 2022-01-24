import queryStringHandler from './queryStringHandler';

var getUrlParameterByName = function(name, url) {
  // Doc: https://github.com/area17/a17-behaviors/wiki/getUrlParameterByName

  var qsObj = queryStringHandler.toObject(url || undefined);
  return (qsObj[name] !== undefined) ? qsObj[name] : undefined;
};

export default getUrlParameterByName;
