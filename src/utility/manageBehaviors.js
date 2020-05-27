export function manageBehaviors(loadedBehaviorsModule, dataAttr = 'behavior') {
  const loadedBehaviorNames = Object.keys(loadedBehaviorsModule);
  const loadedBehaviors = {};
  const activeBehaviors = new Map();

  function loopBehaviors(node, cb) {
    if (!('querySelectorAll' in node)) {
      // Ignore text or comment nodes
      return;
    }
    const behaviorNodes = [node].concat(
      [].slice.call(node.querySelectorAll(`[data-${dataAttr}]`))
    );
    for (let i = 0; i < behaviorNodes.length; i++) {
      const behaviorNode = behaviorNodes[i];
      const behaviorNames =
        behaviorNode.dataset &&
        behaviorNode.dataset[dataAttr] &&
        behaviorNode.dataset[dataAttr].split(' ');
      if (behaviorNames) {
        behaviorNames.forEach(name => {
          cb(name, behaviorNode);
        });
      }
    }
  }

  function destroyBehaviors(node) {
    loopBehaviors(node, (bName, bNode) => {
      const nodeBehaviors = activeBehaviors.get(bNode);
      if (!nodeBehaviors || !nodeBehaviors[bName]) {
        console.warn(`No behavior ${bName} instance on:`, bNode);
        return;
      }
      nodeBehaviors[bName].destroy();
      delete nodeBehaviors[bName];
    });
  }

  function createBehaviors(node) {
    loopBehaviors(node, (bName, bNode) => {
      if (!loadedBehaviors[bName]) {
        console.warn(`No loaded behavior called ${bName}`);
        return;
      }

      const instance = new loadedBehaviors[bName](bNode);
      instance.init();
      const nodeBehaviors = activeBehaviors.get(bNode) || {};
      nodeBehaviors[bName] = instance;
      activeBehaviors.set(bNode, nodeBehaviors);
    });
  }

  function observeBehaviors() {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.removedNodes) {
          for (let i = 0; i < mutation.removedNodes.length; i++) {
            const node = mutation.removedNodes[i];
            destroyBehaviors(node);
          }
        }
      });

      mutations.forEach(mutation => {
        if (mutation.addedNodes) {
          for (let i = 0; i < mutation.addedNodes.length; i++) {
            const node = mutation.addedNodes[i];
            createBehaviors(node);
          }
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false,
    });
  }

  loadedBehaviorNames.forEach(name => {
    loadedBehaviors[name] = loadedBehaviorsModule[name];
  });

  createBehaviors(document);
  observeBehaviors();
}

export default manageBehaviors;
