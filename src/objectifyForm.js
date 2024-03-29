/**
 * Generates a JS Object out of a form. Note: does not add items from input[type=file] or input[disabled].
 *
 * @param {HTMLFormElement} form - The form node
 * @returns {Object} - JS Object compiled from the form
*/
const objectifyForm = function(form) {
  // Doc: https://github.com/area17/js-helpers/wiki/objectifyForm

  const obj = {};

  if (typeof form === 'object' && form.nodeName === 'FORM') {
    const len = form.elements.length;
    for (let i = 0; i < len; i++) {
      const field = form.elements[i];
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
