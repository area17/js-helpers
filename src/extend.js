var extend = function () {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/extend

  var obj = {};
  var i = 0;
  var argumentsLength = arguments.length;
  var key;

  for (; i < argumentsLength; i++) {
    for (key in arguments[i]) {
      if (arguments[i].hasOwnProperty(key)) {
        obj[key] = arguments[i][key];
      }
    }
  }

  return obj;

};

export extend;
