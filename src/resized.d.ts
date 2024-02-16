export default resized;
/**
 * resized : Debounces window resize, also checks if current media query has changed
 * @example document.addEventListener('resized', function(event) { console.log(event.detail.breakpoint); });
*/
declare function resized(): void;
