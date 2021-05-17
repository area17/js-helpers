import getCurrentMediaQuery from './getCurrentMediaQuery';

var isBreakpoint = function(bp) {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/isBreakpoint

  // bail if no breakpoint is passed
  if (!bp) {
    console.error('You need to pass a breakpoint name!');
    return false;
  }

  // we only want to look for a specific modifier and make sure it is at the end of the string
  let pattern = new RegExp('\\+$|\\-$');

  // bps must be in order from smallest to largest
  let bps = ['xs', 'md', 'lg', 'xl', 'xxl'];

  // override the breakpoints if the option is set on the global A17 object
  if( window.A17 && window.A17.breakpoints ){
    if( Array.isArray(window.A17.breakpoints) ){
      bps = window.A17.breakpoints;
    }else{
      console.warn('A17.breakpoints should be an array. Using defaults.');
    }
  }

  // store current breakpoint in use
  let currentBp = getCurrentMediaQuery();

  // store the index of the current breakpoint
  let currentBpIndex = bps.indexOf(currentBp);

  // check to see if bp has a + or - modifier
  let hasModifier = pattern.exec(bp);

  // store modifier value
  let modifier = hasModifier ? hasModifier[0] : false;

  // store the trimmed breakpoint name if a modifier exists, if not, store the full queried breakpoint name
  let bpName = hasModifier ? bp.slice(0, -1) : bp;

  // store the index of the queried breakpoint
  let bpIndex = bps.indexOf(bpName);

  // let people know if the breakpoint name is unrecognized
  if (bpIndex < 0) {
    console.warn('Unrecognized breakpoint. Supported breakpoints are: '+ bps.join(', '));
    return false;
  }

  // compare the modifier with the index of the current breakpoint in the bps array with the index of the queried breakpoint.
  // if no modifier is set, compare the queried breakpoint name with the current breakpoint name
  if ((modifier === '+' && currentBpIndex >= bpIndex) || (modifier === '-' && currentBpIndex <= bpIndex) || (!modifier && bp === currentBp)) {
    return true;
  }

  // the current breakpoint isn’t the one you’re looking for
  return false;
};

export default isBreakpoint;

