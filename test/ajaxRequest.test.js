import ajaxRequest from './../src/ajaxRequest.js';

describe('ajaxRequest', () => {
  it('exists', () => {
    expect(typeof ajaxRequest).toBe('function');
  });

  it.todo('Sends XMLHttpRequest get requests');

  it.todo('Sends XMLHttpRequest post requests');

  it.todo('Run success callback on success');

  it.todo('Run error callback on success');

  it.todo('Aborts requests');
});
