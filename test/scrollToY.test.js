import scrollToY from './../src/utility/scrollToY';

const setUpHtml = () => {
  const div = document.createElement('div');
  div.innerHTML = `
    <div class="scrollMe"></div>
      `;
  return div;
};

describe('scrollToY utility', () => {
  it('scrollToY exists', () => {
    expect(typeof scrollToY).toBe('function');
  });

  it('emits on complete', () => {
    const container = setUpHtml();
    const mockComplete = jest.fn();

    scrollToY({
      el: container.querySelector('.scrollMe'),
      duration: 500,
      easing: 'easeInOut',
      onComplete: mockComplete,
    });
    expect(mockComplete).toHaveBeenCalled();
  });
});
