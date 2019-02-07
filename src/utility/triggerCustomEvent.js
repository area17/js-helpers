var triggerCustomEvent = function(el, type, data) {
  console.warn('Deprecation notice: triggerCustomEvent\nConsider using CustomEvent\nhttps://developer.mozilla.org/en-US/docs/Web/API/CustomEvent\n(A17 Boilerplate polyfills for IE11)');

  // Doc: https://code.area17.com/a17/a17-helpers/wikis/triggerCustomEvent

  var event = document.createEvent('HTMLEvents');
  event.initEvent(type, true, true);
  event.data = data || {};
  event.eventName = type;
  el.dispatchEvent(event);
};

export default triggerCustomEvent;
