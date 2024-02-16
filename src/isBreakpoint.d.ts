export default isBreakpoint;
/**
 * isBreakpoint : Checks if the current breakpoint matches the passed breakpoint. It supports querying with or without +/- modifiers.
 *
 * @param {string} breakpoint The breakpoint to check against
 * @param {string[]} [breakpoints] Array of breakpoint names to test against
 * @returns {boolean} Returns true if the breakpoint matches, false if not
 */
declare function isBreakpoint(breakpoint: string, breakpoints?: string[]): boolean;
