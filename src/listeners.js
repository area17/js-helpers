const listeners = {
  add(nodes, type, func, options = false) {
    // Doc: https://github.com/area17/a17-behaviors/wiki/addListener

    if (NodeList.prototype.isPrototypeOf(nodes)) {
      nodes.forEach($node => {
        $node.addEventListener(type, func, options);
      });
    } else {
      console.log('Warning - addListener - no NodeList passed');
      return '';
    }
  },
  remove(nodes, type, func, options = false) {
    // Doc: https://github.com/area17/a17-behaviors/wiki/removeListener
    if (NodeList.prototype.isPrototypeOf(nodes)) {
      nodes.forEach($node => {
        $node.removeEventListener(type, func, options);
      });
    } else {
      console.log('Warning - addListener - no NodeList passed');
      return '';
    }
  },
};

export default listeners;
