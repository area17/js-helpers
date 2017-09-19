var triggerCustomEvent = function(el, type, data) {
  // Doc: https://code.area17.com/mike/a17-js-helpers/wikis/A17-Helpers-triggerCustomEvent

  var event = document.createEvent('HTMLEvents');
  event.initEvent(type, true, true);
  event.data = data || {};
  event.eventName = type;
  el.dispatchEvent(event);
};

export default triggerCustomEvent;
