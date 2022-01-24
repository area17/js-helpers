import copyTextToClipboard from './../src/copyTextToClipboard';

// ------- Mock -------
//Solution for mocking clipboard so it can be tested credit: https://stackoverflow.com/questions/62351935/how-to-mock-navigator-clipboard-writetext-in-jest
const originalClipboard = { ...global.navigator.clipboard };

beforeEach(() => {
    let clipboardData = '' //initalizing clipboard data so it can be used in testing
    const mockClipboard = {
        writeText: jest.fn(
            (data) => {
                clipboardData = data;
                // returning a promise to suit our. helper
                return new Promise((resolve, reject) => {
                    resolve(clipboardData);
                });
            }
        ),
        readText: jest.fn(
            () => {return clipboardData}
        ),
    };
    global.navigator.clipboard = mockClipboard;

});

afterEach(() => {
    jest.resetAllMocks();
    global.navigator.clipboard = originalClipboard;
});
// --------------------

describe('extend utility', () => {
  it('copyTextToClipboard exists', () => {
    expect(typeof copyTextToClipboard).toBe('function');
  });

  it("copies a string to the clipboard", async () => {
      const string = 'test'
      copyTextToClipboard(string)

      expect(navigator.clipboard.readText()).toBe(string)
      expect(navigator.clipboard.writeText).toBeCalledTimes(1);
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(string);
  });
});
