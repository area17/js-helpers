import triggerCustomEvent from './../src/utility/triggerCustomEvent';

// depricated
describe('custom event utility', () => {
  it('exists', () => {
    expect(typeof triggerCustomEvent).toBe('function');
  });
});
