var getCurrentMediaQuery = function() {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/getCurrentMediaQuery

  return getComputedStyle(document.documentElement).getPropertyValue('--breakpoint').trim();
};


export default getCurrentMediaQuery;
