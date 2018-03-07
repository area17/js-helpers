var purgeProperties = function(obj) {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/purgeProperties
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      delete obj[prop];
    }
  }
};

export default purgeProperties;
