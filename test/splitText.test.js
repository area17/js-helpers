import SplitText from './../src/splitText';
describe('splitText', () => {
  it('exists', () => {
    expect(typeof SplitText).toBe('function');
  });

  it('splitText by chars correctly', () => {
    let div = document.createElement('div');
    div.innerHTML = 'Text with 19 chars.';
    document.body.appendChild(div);
    const splitText = new SplitText(div);
    splitText.chars();
    const charsEls = div.querySelectorAll('span');
    // one extra empty chars for the space
    expect(charsEls.length).toEqual(19 + 1);
  });

  it('splitText by words correctly', () => {
    let div = document.createElement('div');
    div.innerHTML = 'Text with 4 words.';
    document.body.appendChild(div);
    const splitText = new SplitText(div);
    splitText.words();
    const wordsEls = div.querySelectorAll('span');
    expect(wordsEls.length).toEqual(4);
  });

  it('splitText options correctly', () => {
    let div = document.createElement('div');
    div.innerHTML = 'Text with 4 words.';
    document.body.appendChild(div);
    const splitText = new SplitText(div, { wordClass : 'word-item' });
    splitText.words();
    const wordsEls = div.querySelectorAll('.word-item');
    expect(wordsEls.length).toEqual(4);
  });
});
