import oritentationChangeFix from './../src/oritentationChangeFix';

jest.useFakeTimers();

describe('oritentationChangeFix utility', () => {
  it('exists', () => {
    expect(typeof oritentationChangeFix).toBe('function');
  });

  it('sets viewport meta', () => {

    Object.defineProperty(window.navigator, 'userAgent', {
      value : 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16D57'
    });

    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1';
    document.head.appendChild(meta);

    oritentationChangeFix();

    const viewportmeta = document.querySelector('meta[name="viewport"]');

    expect(viewportmeta.content).toEqual('width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0');

    document.body.dispatchEvent(new Event('gesturestart'));
    document.body.dispatchEvent(new Event('gestureend'));

    // Move on the timer
    jest.advanceTimersByTime(100);

    expect(viewportmeta.content).toEqual('width=device-width, minimum-scale=0.25, maximum-scale=1.6');

  });
});
