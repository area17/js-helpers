var getMetaContentByName = function(name) {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/getMetaContentByName

  return document.querySelector('meta[name=\''+name+'\']').getAttribute('content');
};

export default getMetaContentByName;
