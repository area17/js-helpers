import debounce from './../src/debounce';

jest.useFakeTimers();

describe('debounce utility', () => {
  it('debounce exists', () => {
    expect(typeof debounce).toBe('function');
  });

  test('execute just once', () => {
      const func = jest.fn();
      const debouncedFunc = debounce(func, 500);

      // Execute for the first time
      debouncedFunc();

      // Move on the timer
      jest.advanceTimersByTime(250);
      // try to execute a 2nd time
      debouncedFunc();

      // Fast-forward time
      jest.runAllTimers();

      expect(func).toBeCalledTimes(1);
  });

  test('execute twice', () => {
      const func = jest.fn();
      const debouncedFunc = debounce(func, 100);

      // Execute for the first time
      debouncedFunc();

      // Move on the timer
      jest.advanceTimersByTime(250);
      // try to execute a 2nd time
      debouncedFunc();

      // Fast-forward time
      jest.runAllTimers();

      expect(func).toBeCalledTimes(2);
  });

  test('execute with immediate', () => {
      const func = jest.fn();
      const debouncedFunc = debounce(func, 500, true);

      // Execute for the first time
      debouncedFunc();

      expect(func).toBeCalledTimes(1);

      // Move on the timer
      jest.advanceTimersByTime(250);
      // try to execute a 2nd time
      debouncedFunc();

      // Fast-forward time
      jest.runAllTimers();

      expect(func).toBeCalledTimes(1);
  });
});
