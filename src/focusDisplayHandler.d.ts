export default focusDisplayHandler;
/**
 * focusDisplayHandler : Adds data-focus-method to document.activeElement which differentiates between keyboard, mouse and touch focus - values of which can be touch, key or mouse. This allows you to style keyboard focus events and hide the focus ring for mouse events (because designers hate those!)
 */
declare function focusDisplayHandler(): void;
