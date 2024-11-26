import purgeProperties from './../src/purgeProperties.js';

describe('purge props', () => {
  it('exists', () => {
    expect(typeof purgeProperties).toBe('function');
  });

  it('purges all events', () => {
    const objectthing = {
      thing: 'all',
      somethingelse: 1234,
      nested: { name: [123, 123] },
    };
    purgeProperties(objectthing);
    expect(objectthing).toEqual({});
  });
});
