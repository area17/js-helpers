import queryStringHandler from './../src/utility/queryStringHandler';

const setUpHtml = () => {
  const div = document.createElement('div');
  div.innerHTML = `
    <ul>
      <li>first</li>
      <li>second</li>
      <li>third</li>
    </ul>
      `;
  return div;
};

describe('queryStringHandler utility', () => {
  it('exists', () => {
    expect(typeof queryStringHandler).toBe('object');
    expect(typeof queryStringHandler.toObject).toBe('function');
    expect(typeof queryStringHandler.updateParameter).toBe('function');
    expect(typeof queryStringHandler.fromObject).toBe('function');
  });

  it('toObject works as expected', () => {
    const result = queryStringHandler.toObject(
      'www.google.com?param1=hi&param2=bye'
    );
    expect(result).toEqual({ param1: 'hi', param2: 'bye' });

    // empty result
    const result2 = queryStringHandler.toObject('http://www.google.com');
    expect(result2).toEqual({});
  });

  it('update param works as expected', () => {
    // updates params
    const result = queryStringHandler.updateParameter(
      'www.google.com?param1=hi&param2=bye',
      'param1',
      'newValue'
    );
    expect(result).toBe('www.google.com?param1=newValue&param2=bye');

    // appends new params correctly
    const result2 = queryStringHandler.updateParameter(
      'www.google.com?param1=hi&param2=bye',
      'newParam',
      'newValue'
    );
    expect(result2).toBe(
      'www.google.com?param1=hi&param2=bye&newParam=newValue'
    );
  });

  it('creates params via objects correctly', () => {
    const paramObj = { param1: 'hi there', param2: 'bye there' };
    const result = queryStringHandler.fromObject(paramObj);
    expect(result).toBe('?param1=hi%20there&param2=bye%20there');
  });
});
