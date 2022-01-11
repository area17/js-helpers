import setFocusOnTarget from './../src/setFocusOnTarget';
describe('setFocusOnTarget', () => {
  it('exists', () => {
    expect(typeof setFocusOnTarget).toBe('function');
  });

  it('sets focus correctly', () => {
    let button = document.createElement('button');
    document.body.appendChild(button);
    setFocusOnTarget(button);
    expect(document.activeElement).toEqual(button);
  });
});
