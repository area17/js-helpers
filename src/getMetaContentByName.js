var getMetaContentByName = function(name) {
  // Doc: https://github.com/area17/a17-behaviors/wiki/getMetaContentByName

  const tag = document.querySelector('meta[name=\''+name+'\']');

  if (tag) {
    return tag.getAttribute('content');
  } else {
    return null;
  }
};

export default getMetaContentByName;
