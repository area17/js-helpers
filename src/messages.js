var messages = function() {
  // Doc: https://code.area17.com/mike/a17-js-helpers/wikis/A17-Helpers-messages

  var target = document.querySelectorAll('[data-message-target]');

  if (target.length > 0) {
    target = target[0];
  } else {
    return;
  }

  var messageVisible = false;
  var messageTimer;
  var messages = [];
  var loadMessage = target.getAttribute('data-message') || false;
  var loadMessageType = target.getAttribute('data-message-type') || '';

  function createMessage(message, type) {
    var div = document.createElement('div');
    var span = document.createElement('span');
    span.textContent = message;
    div.appendChild(span);
    div.className = (type !== '') ? 'message message--'+type+' s-hide' : 'message s-hide';
    return div;
  }

  function hideMessage(div) {
    div.className += ' s-hide';
    setTimeout(function() {
      div.parentNode.removeChild(div);
    }, 250);
  }

  function showMessage(div, time) {
    messageVisible = true;
    target.appendChild(div);
    div.className = div.className.replace(new RegExp('(^|\\b)' + 's-hide'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    messageTimer = setTimeout(function() {
      hideMessage(div);
      messageVisible = false;
      messages = [];
    }, time || 3000);
  }

  function newMessage(data) {
    messages.push(createMessage(data.data.message, data.data.type || ''));
    if (!messageVisible) {
      showMessage(messages[messages.length - 1], data.data.time || false);
    } else {
      clearTimeout(messageTimer);
      hideMessage(messages[messages.length - 2]);
      showMessage(messages[messages.length - 1], data.data.time || false);
    }
  }

  document.addEventListener('message', newMessage, false);

  if (loadMessage && loadMessage.length > 0) {
    var loadMessageData = {
      data: {
        message: loadMessage,
        time: 5000,
        type: loadMessageType
      }
    };
    newMessage(loadMessageData);
  }
};

export default messages;
