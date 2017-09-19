var getMetaContentByName = function(name) {
  // Doc: https://code.area17.com/mike/a17-js-helpers/wikis/A17-Helpers-getMetaContentByName

  return document.querySelector('meta[name=\''+name+'\']').getAttribute('content');
};

export default getMetaContentByName;
