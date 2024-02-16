/**
 * Growl like messages
 */
const messages = function() {
  // Doc: https://github.com/area17/js-helpers/wiki/messages

  const target = document.querySelector('[data-message-target]');

  if(!target) {
    return;
  }

  let messageVisible = false;
  let messageTimer;
  let messages = [];
  const loadMessage = target.getAttribute('data-message') || false;
  const loadMessageType = target.getAttribute('data-message-type') || '';

  function createMessage(message, type) {
    const div = document.createElement('div');
    const span = document.createElement('span');
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
    const loadMessageData = {
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
