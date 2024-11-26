import isVisible from './../src/isVisible.js';

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

describe('isVisible utility', () => {
    it('exists', () => {
        expect(typeof isVisible).toBe('function');
    });

    it('reports visible div as visible', () => {
        const div = createMockEl('div', 100, 100, {});
        document.body.appendChild(div);

        const visible = isVisible(div);

        expect(visible).toEqual(true);
    });

    it('reports visibility:hidden div as not visible', () => {
        const div = createMockEl('div', 100, 100, {
          visibility: 'hidden',
        });
        document.body.appendChild(div);

        const visible = isVisible(div);

        expect(visible).toEqual(false);
    });

    it('reports opacity:0 div as not visible', () => {
        const div = createMockEl('div', 100, 100, {
          opacity: 0,
        });
        document.body.appendChild(div);

        const visible = isVisible(div);

        expect(visible).toEqual(false);
    });

    it('reports overflow:hidden height:0 div as not visible', () => {
        const div = createMockEl('div', 100, 0, {
          overflow: 'hidden',
        });
        document.body.appendChild(div);

        const visible = isVisible(div);

        expect(visible).toEqual(false);
    });

    it('reports display:none div as not visible', () => {
        const div = createMockEl('div', 100, 100, {
          display: 'none',
        });
        document.body.appendChild(div);

        const visible = isVisible(div);

        expect(visible).toEqual(false);
    });

    it('reports overflow:visible height:0 div as visible', () => {
        const div = createMockEl('div', 100, 0, {
          visibility: 'visible',
        });
        document.body.appendChild(div);

        const visible = isVisible(div);

        expect(visible).toEqual(true);
    });

    /*
      * Requires support for Element API checkVisibility -
      * which we don't yet have in Safari or JSDom
    */
    // it('reports div inside div as visible', () => {
    //     const outer = createMockEl('div', 100, 100, {});
    //     const inner = createMockEl('div', 100, 100, {});

    //     outer.appendChild(inner);
    //     document.body.appendChild(outer);

    //     const visible = isVisible(inner);

    //     expect(visible).toEqual(true);
    // });

    // it('reports div inside display:none div as not visible', () => {
    //     const outer = createMockEl('div', 100, 100, {
    //       display: 'none',
    //     });
    //     const inner = createMockEl('div', 100, 100, {});

    //     outer.appendChild(inner);
    //     document.body.appendChild(outer);

    //     const visible = isVisible(inner);

    //     expect(visible).toEqual(false);
    // });
});
