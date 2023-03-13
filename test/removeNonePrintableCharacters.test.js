import removeNonePrintableCharacters from './../src/removeNonePrintableCharacters';

describe('removeNonePrintableCharacters utility', () => {
    it('exists', () => {
        expect(typeof removeNonePrintableCharacters).toBe('function');
    });

    it('remove none printable characters from string', () => {
      let text = `See what's hidden in your string… or be​hind﻿`;
      text = removeNonePrintableCharacters(text);

      expect(text).toBe(`Seewhat's hidden in your string… or behind`);
    });

    it('replace none printable characters from string (replaceMode: true)', () => {
      let text = `See what's hidden in your string… or be​hind﻿`;
      text = removeNonePrintableCharacters(text, true);

      expect(text).toBe(`See what's hidden in your string… or behind`);
    });
});
