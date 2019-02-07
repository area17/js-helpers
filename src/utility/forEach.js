var forEach = function (array, callback, scope) {
  console.warn('Deprecation notice: forEach\nConsider using Array.prototype.forEach or NodeList.prototype.forEach\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach\nhttps://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach\n(A17 Boilerplate polyfills NodeList.prototype.forEach)');
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/forEach
  for (let i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]);
  }
};

export default forEach;

