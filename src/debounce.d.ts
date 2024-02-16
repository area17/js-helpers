export default debounce;
/**
 * debounce : Returns a function that will only run N milliseconds after it stops being called. Or optionally will only run once during multiple calls, and won't run again until N milliseconds after the last call.
 *
 * @param {Function} func required - function to be debounced
 * @param {Number} wait required - delay after last call fire the func
 * @param {Boolean} [immediate] optional - triggers the func immediately but then won't trigger it again until the wait time has passed after the last call
 * @returns {Function}
*/
declare function debounce(func: Function, wait: number, immediate?: boolean): Function;
