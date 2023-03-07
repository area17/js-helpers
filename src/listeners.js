const addListener = (nodes, func, opt = false) => {
  nodes.forEach($node => {
    $node.addEventListener('click', func, opt);
  });
};

const removeListener = (nodes, func, opt) => {
  nodes.forEach($node => {
    $node.removeEventListener('click', func, opt);
  });
};

export { addListener, removeListener };
