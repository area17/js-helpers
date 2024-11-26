import removeNoneASCIICharacters from './../src/removeNoneASCIICharacters.js';

describe('removeNoneASCIICharacters utility', () => {
    it('exists', () => {
        expect(typeof removeNoneASCIICharacters).toBe('function');
    });

    it('replaces accented characters from string', () => {
      let text = ` ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿƒΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρςστυφχψωϑϒϖ•…′″‾⁄℘ℑℜ™ℵ←↑→↓↔↵⇐⇑⇒⇓⇔∀∂∃∅∇∈∉∋∏∑−∗√∝∞∠∧∨∩∪∫∴∼≅≈≠≡≤≥⊂⊃⊄⊆⊇⊕⊗⊥⋅⌈⌉⌊⌋〈〉◊♠♣♥♦"&<>ŒœŠšŸˆ˜   ‌‍‎‏–—‘’‚“”„†‡‰‹›€asdf`;
      text = removeNoneASCIICharacters(text);

      expect(text).toBe('"&<>asdf');
    });
});
