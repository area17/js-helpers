export default responsiveImageSizes;
/**
 * responsiveImageSizes : outputs HTML sizes string
 * @param {object, array, string} sizes - size information to convert
 * @param {Object} feConfig - front end breakpoint, columns
 * @param {boolean} relativeUnits - convert PX to REM, defaults to true
 * @returns {string} - for image `sizes` attribute
*/
declare function responsiveImageSizes(sizes: any, feConfig?: any, relativeUnits?: boolean): string;
