var purgeProperties = function(obj) {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/purgeProperties
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      delete obj[prop];
    }
  }

  // alternatives considered: https://jsperf.com/deleting-properties-from-an-object
};

export default purgeProperties;
