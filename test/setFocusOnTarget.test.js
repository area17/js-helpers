import setFocusOnTarget from './../src/setFocusOnTarget';
describe('setFocusOnTarget', () => {
  it('exists', () => {
    expect(typeof setFocusOnTarget).toBe('function');
  });

  it('sets focus correctly (button)', () => {
    let button = document.createElement('button');
    document.body.appendChild(button);
    setFocusOnTarget(button);
    expect(document.activeElement).toEqual(button);
  });

  it('sets focus correctly (div)', () => {
    let div = document.createElement('div');
    document.body.appendChild(div);
    setFocusOnTarget(div);
    expect(document.activeElement).toEqual(div);
  });
});
