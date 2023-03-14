import removeHTMLentities from './../src/removeHTMLentities';

describe('removeHTMLentities utility', () => {
    it('exists', () => {
        expect(typeof removeHTMLentities).toBe('function');
    });

    it('removes HTML entities from string', () => {
      let text = `<div><img src="/foo/bar.jpg" /></div>`;
      text = removeHTMLentities(text);

      expect(text).toBe('divimg src=/foo/bar.jpg //div');
    });

    it('replaces HTML entities in string', () => {
      let text = `<div><img src="/foo/bar.jpg" /></div>`;
      text = removeHTMLentities(text, true);

      expect(text).toBe('&lt;div&gt;&lt;img src=&quot;/foo/bar.jpg&quot; /&gt;&lt;/div&gt;');
    });
});
