var copyTextToClipboard = function(textToCopy,successMsg) {

  // Doc: https://code.area17.com/a17/a17-helpers/wikis/copyTextToClipboard

  // http://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript#answer-30810322

  // and then
  // https://stackoverflow.com/questions/47879184/document-execcommandcopy-not-working-on-chrome?rq=1&utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
  // https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa

  if (navigator.clipboard && ('Promise' in window) && window.location.protocol == 'https:') {
    navigator.clipboard.writeText(textToCopy).then(function(successMsg) {
      //console.log(successMsg);
    }, function(err) {
      console.error('Could not copy text: ', err);
    });
  } else {
    var textArea = document.createElement('textarea');

    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = 0;
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';

    //textArea.value = textToCopy;
    textArea.textContent = textToCopy;
    document.body.appendChild(textArea);

    var selection = document.getSelection();
    var range = document.createRange();
    range.selectNode(textArea);
    selection.removeAllRanges();
    selection.addRange(range);

    try {
      var successful = document.execCommand('copy');
      if (successful) {
        window.alert(successMsg || 'Copied to clipboard');
      } else {
        console.log('Could not copy text', 'document.execCommand(\'copy\') failed');
      }
    } catch (err) {
      console.log('Could not copy text', err);
    }

    document.body.removeChild(textArea);
  }
};

export default copyTextToClipboard;
