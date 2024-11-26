import nl2br from './../src/nl2br.js';

describe('nl2br utility', () => {
    it('exists', () => {
        expect(typeof nl2br).toBe('function');
    });

    it('replaces newlines with `<br>`', () => {
      let text = `hello

world`;
      text = nl2br(text);

      expect(text).toBe('hello<br><br>world');
    });

    it('inserts `<br>` at newlines (`replaceMode: false`)', () => {
      let text = `hello

world`;
      text = nl2br(text, false);

      expect(text).toBe(`hello<br>
<br>
world`);
    });
});
