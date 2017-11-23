const forEach = function (array, callback, scope) {
  // Doc: https://code.area17.com/mike/a17-js-helpers/wikis/A17-Helpers-forEach
  for (let i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]);
  }
};

export default forEach;
