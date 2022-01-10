import getUrlParameterByName from './../src/getUrlParameterByName';

describe('queryStringHandler utility', () => {
  it('exists', () => {
    expect(typeof getUrlParameterByName).toBe('function');
  });

  it('gets url correctly', () => {
    const result = getUrlParameterByName(
      'param1',
      'www.google.com?param1=this&param2=that'
    );
    expect(result).toBe('this');

    const result2 = getUrlParameterByName(
      'param2',
      'www.google.com?param1=this&param2=that'
    );
    expect(result2).toBe('that');
  });
});
