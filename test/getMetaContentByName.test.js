import getMetaContentByName from './../src/getMetaContentByName.js';

describe('getMetaContentByName utility', () => {

  it('extend exists', () => {
    expect(typeof getMetaContentByName).toBe('function');
  });

  it('reads tag content', () => {
    const meta = document.createElement('meta');
    meta.name = 'foo';
    meta.content = 'bar';

    document.head.appendChild(meta);

    const content = getMetaContentByName('foo');

    expect(content).toEqual('bar');

    document.head.removeChild(meta);
  });

  it('fails safely', () => {
    const meta = document.createElement('meta');
    meta.name = 'foo';

    document.head.appendChild(meta);

    expect(getMetaContentByName('foo')).toBeNull();
    expect(getMetaContentByName('bar')).toBeNull();
  });
});
