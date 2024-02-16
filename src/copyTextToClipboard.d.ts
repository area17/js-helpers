export default copyTextToClipboard;
/**
 * copyTextToClipboard : Copies a string to the clipboard, if successful shows an alert with a message
 *
 * @param {string} textToCopy - required - string of text to copy
 * @param {string} [successMsg] - optional - string of text to display in the alert if successful, default says "Copied to clipboard"
*/
declare function copyTextToClipboard(textToCopy: string, successMsg?: string): void;
