/**
 * getMetaContentByName : Returns a metatag content by name
 *
 * @param {string} name The name of the metatag
 * @returns {string|null} The content of the metatag
 */
const getMetaContentByName = function(name) {
  // Doc: https://github.com/area17/js-helpers/wiki/getMetaContentByName

  const tag = document.querySelector('meta[name=\''+name+'\']');
  return tag ? tag.getAttribute('content') : null;
};

export default getMetaContentByName;
