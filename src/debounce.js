/**
 * debounce : Returns a function that will only run N milliseconds after it stops being called. Or optionally will only run once during multiple calls, and won't run again until N milliseconds after the last call.
 *
 * @param {Function} func required - function to be debounced
 * @param {Number} wait required - delay after last call fire the func
 * @param {Boolean} [immediate] optional - triggers the func immediately but then won't trigger it again until the wait time has passed after the last call
 * @returns {Function}
*/
const debounce = function(func, wait, immediate) {
  // Doc: https://github.com/area17/js-helpers/wiki/debounce
  var timeout;
  return function() {
    var context = this;
    var args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    var callNow = (immediate && !timeout);
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
};

export default debounce;
