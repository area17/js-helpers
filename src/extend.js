/**
 * extend : Merges the contents of two objects together
 *
 * @param {Object} object - any number of objects
 * @returns {Object} merged object
*/
const extend = function () {
  // Doc: https://github.com/area17/js-helpers/wiki/extend

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

export default extend;
