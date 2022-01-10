import focusTrap from './../src/focusTrap';

// set up some html
const setUpHtml = () => {
  const div = document.createElement('div');
  div.innerHTML = `
    <div class="getMe" style="height: 200px; width: 300px;"></div>
      `;
  return div;
};

afterEach(() => {});

describe('focusTrap utility', () => {
  it('exists', () => {
    expect(typeof focusTrap).toBe('function');
  });

  it('sets up correctly', () => {
    const real = document.addEventListener;
    document.addEventListener = jest.fn();
    focusTrap();
    expect(document.addEventListener).toHaveBeenCalledTimes(2);
    expect(document.addEventListener.mock.calls[0][0]).toBe('focus:trap');
    expect(document.addEventListener.mock.calls[1][0]).toBe('focus:untrap');
    document.addEventListener = real;
  });
});
