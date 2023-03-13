import focusTrap from './../src/focusTrap';

jest.useFakeTimers();

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

  it('on focus outside, sets focus inside', () => {
    const innerButton = document.createElement('button');
    innerButton.dataset.name = 'inner';
    const outerButton = document.createElement('button');
    outerButton.dataset.name = 'outer';
    const div = document.createElement('div');
    div.dataset.name = 'container';

    div.appendChild(innerButton);
    document.body.appendChild(div);
    document.body.appendChild(outerButton);

    focusTrap();

    document.dispatchEvent(new CustomEvent('focus:trap', {
      detail: {
        element: div,
      }
    }));

    jest.advanceTimersByTime(0);

    outerButton.focus();
    // the helper has a setTimeout of 0 to move the focus from outside to inside
    jest.advanceTimersByTime(0);

    expect(document.activeElement.dataset.name).toEqual(div.dataset.name);
  });

  it('untrapping allows focus outside', () => {
    const innerButton = document.createElement('button');
    innerButton.dataset.name = 'inner';
    const outerButton = document.createElement('button');
    outerButton.dataset.name = 'outer';
    const div = document.createElement('div');
    div.dataset.name = 'container';

    div.appendChild(innerButton);
    document.body.appendChild(div);
    document.body.appendChild(outerButton);

    focusTrap();

    document.dispatchEvent(new CustomEvent('focus:trap', {
        detail: {
            element: div
        },
    }));

    outerButton.focus();
    // the helper has a setTimeout of 0 to move the focus from outside to inside
    jest.advanceTimersByTime(1);

    expect(document.activeElement.dataset.name).toEqual(div.dataset.name);

    document.dispatchEvent(new CustomEvent('focus:untrap'));

    outerButton.focus();
    // the helper has a setTimeout of 0 to move the focus from outside to inside
    jest.advanceTimersByTime(1);

    expect(document.activeElement.dataset.name).toEqual(outerButton.dataset.name);
  });
});
