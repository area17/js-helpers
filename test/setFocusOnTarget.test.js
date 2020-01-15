import setFocusOnTarget from './../src/utility/setFocusOnTarget';
describe('setFocusOnTarget', () => {
  it('exists', () => {
    expect(typeof setFocusOnTarget).toBe('function');
  });

  it('sets focus correctly', () => {
    let div = document.createElement('div');
    setFocusOnTarget(div);
    expect(document.activeElement).toEqual(div);
  });
});
