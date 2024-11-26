import toChars from './toChars.js';

// SplitText : Split text by Chars, Words or Lines
// To use with animation library to animate each chars, words or lines within a given element.

// Usage:
// const splitText = new SplitText('.js-split-text')
// Then :
// splitText.chars()
// splitText.words()
// splitText.lines()
// For lines, you will need to call again lines() on window resize event.
// Demo : https://codepen.io/mrdoinel/pen/jOJLYXQ

// Helper function to retrieve an (and only one) element from DOM
function getElement(selectorOrElement) {
  if (selectorOrElement instanceof Element) {
    // If it's an HTML element, return it
    return selectorOrElement;
  } else if (selectorOrElement instanceof NodeList) {
    // If it's a NodeList, return the first element or null if it's empty
    return selectorOrElement.length > 0 ? selectorOrElement[0] : null;
  } else if (typeof selectorOrElement === 'string') {
    return document.querySelector(selectorOrElement);
  }
  return null;
}

const createElement = (tagname, content = "", ...cssClass) => {
  const el = document.createElement(tagname);
  el.classList.add(...cssClass);
  el.innerHTML = content;
  return el;
}

// options
const DEFAULT_OPTIONS = {
  charClass: "split--char",
  wordClass: "split--word",
  lineClass: "split--line",
  globalClass: "split",
};

/**
 * SplitText the text content of a target element into words and/or characters.
 *
 * @param {string|HTMLElement} elementOrSelector an HTML Element or string selector
 * @param {Object} options SplitText options
 */
export default class SplitText {
  // DOM
  target = null;
  textContent = null;

  // Save text
  rawChars = [];
  rawWords = [];
  wrappedChars = [];
  wrappedWords = [];

  constructor(elementOrSelector, opts = {}) {
    this.options = { ...DEFAULT_OPTIONS, ...opts };
    this.init(elementOrSelector);
  }

  getChars() {
    this.rawChars = toChars(this.textContent);
    this.rawChars.push(" ");

    this.rawChars.forEach((char) => {
      const charElement = createElement(
        "span",
        `${char}`,
        `${this.options.globalClass}`,
        `${this.options.charClass}`
      );

      this.wrappedChars.push(charElement);
    });
  }

  getWords() {
    let startIndex = 0;
    this.rawChars.forEach((rawChar, index) => {
      if (rawChar === " ") {
        const wordArray = this.rawChars
          .slice(startIndex, index)
          .filter((word) => word !== " ");

        this.rawWords.push(wordArray.join(''));
        startIndex = index;
      }
    });

    this.rawWords.forEach((word) => {
      const wordDiv = createElement(
        "span",
        `${word}`,
        `${this.options.globalClass}`,
        `${this.options.wordClass}`
      );

      this.wrappedWords.push(wordDiv);
    });
  }

  clearContent() {
    this.target.innerHTML = "";
  }

  // Split text by chars
  chars() {
    this.clearContent();
    this.wrappedChars.forEach((char) => {
      this.target.append(char);
      this.target.append(" ");
    });
  }

  // Split text by words
  words() {
    this.clearContent();
    this.wrappedWords.forEach((word) => {
      this.target.append(word);
      this.target.append(" ");
    });
  }

  // Split text by lines
  lines() {
    this.words();

    let startIndex = 0;
    let lineArrays = [];

    const appendToLineArray = () => {

      lineArrays.forEach((lineArray) => {
        const lineDiv = createElement(
          "div",
          "",
          `${this.options.globalClass}`,
          `${this.options.lineClass}`
        );

        lineArray.forEach(lineWord => {
          lineDiv.append(lineWord);
          lineDiv.append(" ");
        })
        this.target.append(lineDiv);
      });
    };

    // detect new line based on word offsetTop
    this.wrappedWords.reduce((oldOffsetTop, word, index) => {
      const currentOffsetTop = word.offsetTop;

      if (
        (oldOffsetTop !== currentOffsetTop && oldOffsetTop !== null) ||
        index === this.wrappedWords.length - 1
      ) {
        const computedIndex =
          index === this.wrappedWords.length - 1 ? index + 1 : index;
        const lineArray = this.wrappedWords.slice(startIndex, computedIndex);
        lineArrays.push(lineArray);
        startIndex = index;
      }

      return currentOffsetTop;
    }, null);

    appendToLineArray();
  }

  init(elementOrSelector) {
    this.target = getElement(elementOrSelector);

    if (typeof selectorOrElement === 'string') {
      if (elementOrSelector === "") {
        console.error(`Selector is empty! Please give a valid selector!`);
      } else if (!this.target) {
        console.error(`Can't found ${elementOrSelector} in DOM tree!`);
      }
    }

    if (this.target === null) return;

    this.textContent = this.target.textContent;
    this.clearContent();

    // save text
    this.getChars();
    this.getWords();
  }
}
