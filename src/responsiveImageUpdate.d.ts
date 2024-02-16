/**
 * Responsive Image Update
 * Safari doesn't reassess srcset with resize, see: https://bugs.webkit.org/show_bug.cgi?id=149899
 * Update responsive images when the window is resized
 */
export function responsiveImageUpdate(): void;
export default responsiveImageUpdate;
