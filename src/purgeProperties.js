var purgeProperties = function(obj) {
  // Doc: https://github.com/area17/a17-behaviors/wiki/purgeProperties
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      delete obj[prop];
    }
  }

  // alternatives considered: https://jsperf.com/deleting-properties-from-an-object
};

export default purgeProperties;
