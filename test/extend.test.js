import extend from './../src/extend';

describe('extend utility', () => {
  it('extend exists', () => {
    expect(typeof extend).toBe('function');
  });

  it('merges objects correctly', () => {
    const obj1 = { foo: 1 };
    const obj2 = { bar: 2 };
    const obj3 = { qux: 3 };
    const merged_obj = extend(obj1, obj2, obj3);
    expect(merged_obj).toEqual({ foo: 1, bar: 2, qux: 3 });
  });

  it('overwrites key values in a expected manner', () => {
    const obj1 = { foo: 1 };
    const obj2 = { foo: 2 };
    const merged_obj = extend(obj1, obj2);
    expect(merged_obj).toEqual({ foo: 2 });

    const obja = { foo: 999 };
    const objb = { foo: 777 };
    const objc = { foo: 666 };
    const merged_obj2 = extend(obja, objb, objc);
    expect(merged_obj2).toEqual({ foo: 666 });
  });
});
