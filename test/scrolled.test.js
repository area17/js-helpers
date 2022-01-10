import scrolled from './../src/scrolled';
const realDispatchEvent = document.dispatchEvent;
document.dispatchEvent = jest.fn();

beforeEach(() => {
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => cb());
});

afterEach(() => {
  window.requestAnimationFrame.mockRestore();
});

window.pageYOffset = jest
  .fn(() => 0)
  .mockImplementationOnce(() => 0)
  .mockImplementationOnce(() => 100);

describe('scrolled', () => {
  it('exists', () => {
    expect(typeof scrolled).toBe('function');
  });

  it('triggers scroll on dispatch', () => {
    scrolled();
    window.dispatchEvent(new Event('scroll'));

    expect(document.dispatchEvent.mock.calls[0][0].type).toBe('scrolled');
  });
});
