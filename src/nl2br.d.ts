export default nl2br;
/**
 * nl2br : This function is similar to PHP's nl2br()
 *
 * @param {string} str Input text
 * @param {boolean} replaceMode Use replace instead of insert
 * @return {string} Filtered text
 */
declare function nl2br(str: string, replaceMode?: boolean): string;
