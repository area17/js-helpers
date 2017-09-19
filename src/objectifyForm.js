var objectifyForm = function(form) {
  // Doc: https://code.area17.com/mike/a17-js-helpers/wikis/A17-Helpers-objectifyForm

  var field;
  var obj = {};

  if (typeof form === 'object' && form.nodeName === 'FORM') {
    var len = form.elements.length;
    for (var i = 0; i < len; i++) {
      field = form.elements[i];
      if (field.name && !field.disabled && field.type !== 'file' && field.type !== 'reset' && field.type !== 'submit' && field.type !== 'button') {
        if (field.type === 'select-multiple') {
          for (var j = form.elements[i].options.length-1; j >= 0; j--) {
            if(field.options[j].selected) {
              obj[field.name] = field.options[j].value;
            }
          }
        } else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
          obj[field.name] = field.value;
        }
      }
    }
  }
  return obj;
};

export default objectifyForm;
