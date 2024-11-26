import removeEmoji from './../src/removeEmoji.js';

describe('removeEmoji utility', () => {
    it('exists', () => {
        expect(typeof removeEmoji).toBe('function');
    });

    it('removes emoji from string', () => {
      let text = `Hello👋🏻 World🌍`;
      text = removeEmoji(text);

      expect(text).toBe('Hello World');
    });
});
