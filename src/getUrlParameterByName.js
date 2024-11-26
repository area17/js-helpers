import queryStringHandler from './queryStringHandler.js';

/**
 * getUrlParameterByName : Returns value of a parameter from a query string
 *
 * @param {string} name The name of the parameter
 * @param {string} [url] The url to get the parameter from
 * @returns {string|undefined} returns value of requested parameter
 */
const getUrlParameterByName = function(name, url) {
  // Doc: https://github.com/area17/js-helpers/wiki/getUrlParameterByName

  const qsObj = queryStringHandler.toObject(url || undefined);
  return (qsObj[name] !== undefined) ? qsObj[name] : undefined;
};

export default getUrlParameterByName;
