var forEach = function (array, callback, scope) {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/forEach
  for (let i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]);
  }
};

export default forEach;
