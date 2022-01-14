var getMetaContentByName = function(name) {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/getMetaContentByName

  const tag = document.querySelector('meta[name=\''+name+'\']');

  if (tag) {
    return tag.getAttribute('content');
  } else {
    return null;
  }
};

export default getMetaContentByName;
