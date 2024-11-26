import getFocusableElements from './../src/getFocusableElements.js';

function createMockEl(tag, width, height, styles) {
    const el = document.createElement(tag);
    Object.assign(el.style, {
      width: width + 'px',
      height: height + 'px',
      opacity: 1,
      visibility: 'visible',
      overflow: 'visible',
      display: 'block',
      ...styles
    });
    el.getBoundingClientRect = () => ({
        width: el.style.display === 'none' ? 0 : width,
        height: el.style.display === 'none' ? 0 : height,
        top: 0,
        left: 0,
        right: el.style.display === 'none' ? 0 : width,
        bottom: el.style.display === 'none' ? 0 : height,
    });
    el.getClientRects = () => ({
      length: el.style.display === 'none' ? 0 : 1,
    });
    return el;
}

describe('getFocusableElements utility', () => {
    it('exists', () => {
        expect(typeof getFocusableElements).toBe('function');
    });

    it('finds links', () => {
        const el = createMockEl('a', 100, 100, {});
        el.href = '#';

        document.body.appendChild(el);

        const els = getFocusableElements();

        document.body.removeChild(el);

        expect(els.length).toEqual(1);
    });

    it('finds buttons', () => {
        const el = createMockEl('button', 100, 100, {
            display: 'inline-block',
        });

        document.body.appendChild(el);

        const els = getFocusableElements();

        document.body.removeChild(el);

        expect(els.length).toEqual(1);
    });

    it('declines disabled buttons', () => {
        const el = createMockEl('button', 100, 100, {
            display: 'inline-block',
        });
        el.disabled = true;

        document.body.appendChild(el);

        const els = getFocusableElements();

        document.body.removeChild(el);

        expect(els.length).toEqual(0);
    });

    it('declines inert buttons', () => {
        const el = createMockEl('button', 100, 100, {
            display: 'inline-block',
        });
        el.setAttribute('inert', 'true');
        el.inert = true;

        document.body.appendChild(el);

        const els = getFocusableElements();

        document.body.removeChild(el);

        expect(els.length).toEqual(0);
    });

    it('declines hidden buttons', () => {
        const el = createMockEl('button', 100, 100, {
            display: 'none',
        });

        document.body.appendChild(el);

        const els = getFocusableElements();

        document.body.removeChild(el);

        expect(els.length).toEqual(0);
    });

    it('declines buttons inside inert div', () => {
        const div = createMockEl('div', 100, 100, {});
        div.setAttribute('inert', 'true');
        div.inert = true;

        const button = createMockEl('button', 100, 100, {
            display: 'inline-block',
        });

        div.appendChild(button);
        document.body.appendChild(div);

        const els = getFocusableElements();

        document.body.removeChild(div);

        expect(els.length).toEqual(0);
    });

    it('finds form elements', () => {
        const input = createMockEl('input', 100, 100, {
        });
        input.type = 'text';

        const select = createMockEl('select', 100, 100, {
        });
        const textarea = createMockEl('textarea', 100, 100, {
        });


        document.body.appendChild(input);
        document.body.appendChild(select);
        document.body.appendChild(textarea);

        const els = getFocusableElements();

        document.body.removeChild(input);
        document.body.removeChild(select);
        document.body.removeChild(textarea);

        expect(els.length).toEqual(3);
    });

    it('declines form elements inside a disabled fieldset', () => {
        const form = createMockEl('form', 100, 100, {
        });
        const fieldset = createMockEl('fieldset', 100, 100, {
        });
        fieldset.disabled = true;

        const input = createMockEl('input', 100, 100, {
        });
        input.type = 'text';

        const select = createMockEl('select', 100, 100, {
        });
        const textarea = createMockEl('textarea', 100, 100, {
        });


        fieldset.appendChild(input);
        fieldset.appendChild(select);
        fieldset.appendChild(textarea);
        form.appendChild(fieldset);
        document.body.appendChild(form);

        const els = getFocusableElements();

        document.body.removeChild(form);

        expect(els.length).toEqual(0);
    });

    it('finds media elements with controls', () => {
        const audio = createMockEl('audio', 100, 100, {
        });
        audio.setAttribute('controls', 'true');

        const video = createMockEl('video', 100, 100, {
        });
        video.setAttribute('controls', 'true');

        document.body.appendChild(audio);
        document.body.appendChild(video);

        const els = getFocusableElements();

        document.body.removeChild(audio);
        document.body.removeChild(video);

        expect(els.length).toEqual(2);
    });

    it('declines media elements without controls', () => {
        const audio = createMockEl('audio', 100, 100, {
        });

        const video = createMockEl('video', 100, 100, {
        });

        document.body.appendChild(audio);
        document.body.appendChild(video);

        const els = getFocusableElements();

        document.body.removeChild(audio);
        document.body.removeChild(video);

        expect(els.length).toEqual(0);
    });

    it('finds [contenteditable] elements', () => {
        const el = createMockEl('div', 100, 100, {
        });
        el.setAttribute('contenteditable', 'true');
        el.contentEditable = true;

        document.body.appendChild(el);

        const els = getFocusableElements();

        document.body.removeChild(el);

        expect(els.length).toEqual(1);
    });

    it('declines [contenteditable=false] elements', () => {
        const el = createMockEl('div', 100, 100, {
        });
        el.contentEditable = 'false';

        document.body.appendChild(el);

        const els = getFocusableElements();

        document.body.removeChild(el);

        expect(els.length).toEqual(0);
    });

    it('finds summary elements', () => {
        const details = createMockEl('details', 100, 100, {
        });
        const summary = createMockEl('summary', 100, 100, {
        });

        details.appendChild(summary);
        document.body.appendChild(details);

        const els = getFocusableElements();

        document.body.removeChild(details);

        expect(els.length).toEqual(1);
    });

    it('finds [tabindex > -1] elements', () => {
        const el = createMockEl('div', 100, 100, {
        });
        el.tabIndex = '0';

        document.body.appendChild(el);

        const els = getFocusableElements();

        document.body.removeChild(el);

        expect(els.length).toEqual(1);
    });

    it('declines [tabindex="-1"] elements', () => {
        const el = createMockEl('button', 100, 100, {
        });
        el.tabIndex = '-1';

        document.body.appendChild(el);

        const els = getFocusableElements();

        document.body.removeChild(el);

        expect(els.length).toEqual(0);
    });
});
