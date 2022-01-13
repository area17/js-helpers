import focusDisplayHandler from './../src/focusDisplayHandler';

describe('focusDisplayHandler utility', () => {
  it('focusDisplayHandler exists', () => {
    expect(typeof focusDisplayHandler).toBe('function');
  });

  it("reports focus type, removes attribute on blur", async () => {

    focusDisplayHandler();

    let button = document.createElement('button');
    document.body.appendChild(button);

    let event = new MouseEvent('mousedown');
    button.dispatchEvent(event);
    button.focus();

    let focusType = button.dataset && button.dataset.focusMethod ? button.dataset.focusMethod : undefined;

    expect(focusType).toBe('mouse')
    button.blur();

    event = new KeyboardEvent('keydown', {
      'keyCode': 9
    });
    document.dispatchEvent(event);
    button.focus();

    focusType = button.dataset && button.dataset.focusMethod ? button.dataset.focusMethod : undefined;

    expect(focusType).toBe('key');
    button.blur();

    // test touch
    event = new TouchEvent('touchstart');
    document.dispatchEvent(event);
    button.focus();

    focusType = button.dataset && button.dataset.focusMethod ? button.dataset.focusMethod : undefined;

    expect(focusType).toBe('touch');
    button.blur();

    focusType = button.dataset && button.dataset.focusMethod ? button.dataset.focusMethod : undefined;
    expect(focusType).toBeUndefined();
  });
});
