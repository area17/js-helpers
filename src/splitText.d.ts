/**
 * SplitText the text content of a target element into words and/or characters.
 *
 * @param {string|HTMLElement} elementOrSelector an HTML Element or string selector
 * @param {Object} options SplitText options
 */
export default class SplitText {
    constructor(elementOrSelector: any, opts?: {});
    target: any;
    textContent: any;
    rawChars: any[];
    rawWords: any[];
    wrappedChars: any[];
    wrappedWords: any[];
    options: {
        charClass: string;
        wordClass: string;
        lineClass: string;
        globalClass: string;
    };
    getChars(): void;
    getWords(): void;
    clearContent(): void;
    chars(): void;
    words(): void;
    lines(): void;
    init(elementOrSelector: any): void;
}
