import replaceAccentedCharacters from './../src/replaceAccentedCharacters.js';

describe('replaceAccentedCharacters utility', () => {
    it('exists', () => {
        expect(typeof replaceAccentedCharacters).toBe('function');
    });

    it('replaces accented characters from string', () => {
      let text = `Hernán Cortés de Monroy y Pizarro Altamirano`;
      text = replaceAccentedCharacters(text);

      expect(text).toBe('Hernan Cortes de Monroy y Pizarro Altamirano');

      text = `àáâãäåçýÿ`;
      text = replaceAccentedCharacters(text);

      expect(text).toBe('aaaaaacyy');
    });
});
