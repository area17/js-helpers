import getCurrentMediaQuery from './../src/getCurrentMediaQuery';

describe('getCurrentMediaQuery utility', () => {

  it('extend exists', () => {
    expect(typeof getCurrentMediaQuery).toBe('function');
  });

  it('reads CSS variable correctly', () => {
    const styles = document.createElement('style');
    styles.innerHTML = `html { --breakpoint: "md" }`;
    document.head.appendChild(styles);

    const mq = getCurrentMediaQuery();

    expect(mq).toEqual('md');
  });
});
