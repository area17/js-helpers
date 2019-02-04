var triggerCustomEvent = function(el, type, data) {
  console.warn('Obsolete function notice: forEach\nConsider using CustomEvent\nCustomEvent');

  // Doc: https://code.area17.com/a17/a17-helpers/wikis/triggerCustomEvent

  var event = document.createEvent('HTMLEvents');
  event.initEvent(type, true, true);
  event.data = data || {};
  event.eventName = type;
  el.dispatchEvent(event);
};

export default triggerCustomEvent;
