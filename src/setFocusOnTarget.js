var setFocusOnTarget = function(node) {
  // Doc: https://github.com/area17/a17-behaviors/wiki/setFocusOnTarget
  node.focus();
  if (node!== document.activeElement) {
    node.setAttribute('tabindex','-1');
    node.focus();
    node.removeAttribute('tabindex');
  }
};

export default setFocusOnTarget;
