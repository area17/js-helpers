var setFocusOnTarget = function(node) {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/setFocusOnTarget
  node.focus();
  if (node!== document.activeElement) {
    node.setAttribute('tabindex','-1');
    node.focus();
    node.removeAttribute('tabindex');
  }
};

export default setFocusOnTarget;
