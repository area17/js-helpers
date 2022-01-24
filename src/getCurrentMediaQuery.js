var getCurrentMediaQuery = function() {
  // Doc: https://github.com/area17/a17-behaviors/wiki/getCurrentMediaQuery

  return getComputedStyle(document.documentElement).getPropertyValue('--breakpoint').trim().replace(/"/g, '');
};


export default getCurrentMediaQuery;
