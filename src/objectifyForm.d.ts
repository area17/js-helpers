export default objectifyForm;
/**
 * Generates a JS Object out of a form. Note: does not add items from input[type=file] or input[disabled].
 *
 * @param {HTMLFormElement} form - The form node
 * @returns {Object} - JS Object compiled from the form
*/
declare function objectifyForm(form: HTMLFormElement): any;
