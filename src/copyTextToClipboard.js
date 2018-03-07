var copyTextToClipboard = function(textToCopy,successMsg) {

  // https://code.area17.com/mike/a17-js-helpers/wikis/a17-helpers-copyTextToClipboard
  // http://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript#answer-30810322

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

  textArea.value = textToCopy;

  document.body.appendChild(textArea);

  textArea.select();

  try {
    var successful = document.execCommand('copy');
    if (successful) {
      window.alert(successMsg || 'Copied to clipboard');
    } else {
      console.log('Oops, unable to copy');
    }
  } catch (err) {
    console.log('Oops, unable to copy');
  }

  document.body.removeChild(textArea);

};

export default copyTextToClipboard;
