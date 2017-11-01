var setFocusOnTarget = function(node) {
  //https://code.area17.com/mike/a17-js-helpers/wikis/a17-helpers-setFocusOnTarget
  node.focus();
  if (node!== document.activeElement) {
    node.setAttribute('tabindex','-1');
    node.focus();
  }
};

export default setFocusOnTarget;
