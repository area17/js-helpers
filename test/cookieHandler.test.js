import cookieHandler from './../src/cookieHandler';
describe('cookieHandler', () => {
  it('exists', () => {
    expect(typeof cookieHandler).toBe('object');
  });

  it('its methods exists', () => {
    expect(typeof cookieHandler.create).toBe('function');
    expect(typeof cookieHandler.delete).toBe('function');
    expect(typeof cookieHandler.read).toBe('function');
  });

  it('creates cookies', () => {
    cookieHandler.create('test',true,1);

    // taken from MDN
    const cookieValue = document.cookie.split('; ').find(row => row.startsWith('test=')).split('=')[1];

    expect(cookieValue).toEqual('true');
  });

  it('deletes cookies', () => {
    document.cookie = "foo=true;";
    document.cookie = "bar=true;";

    cookieHandler.delete('foo');

    const exists = document.cookie.indexOf('foo');

    expect(exists).toBe(-1);
  });

  it('reads cookies', () => {
    document.cookie = "foo=true;";

    var cookieValue = cookieHandler.read('foo');

    expect(cookieValue).toEqual('true');
  });
});
