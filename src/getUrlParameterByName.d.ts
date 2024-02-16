export default getUrlParameterByName;
/**
 * getUrlParameterByName : Returns value of a parameter from a query string
 *
 * @param {string} name The name of the parameter
 * @param {string} [url] The url to get the parameter from
 * @returns {string|undefined} returns value of requested parameter
 */
declare function getUrlParameterByName(name: string, url?: string): string | undefined;
