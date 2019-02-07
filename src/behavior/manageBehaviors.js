// import * as Behaviors from '../behaviors';

var manageBehaviors = function(Behaviors, options) {

  console.warn('Deprecation notice: manageBehaviors\nConsider using `manageBehaviors` from inside of A17 Boilerplate `frontend/js/functions/manageBehaviors.js`');

  const activeBehaviors = {};

  /*
    default init listens for event 'page:updated':
    manageBehaviors();

    init for pjax:
    manageBehaviors({pageUpdatedEventName:'pjax:end'});

    init for spf:
    manageBehaviors({pageUpdatedEventName:'spfdone'});
  */

  var idCounter = 0;
  var pageUpdatedEventName = (options && options.pageUpdatedEventName) ? options.pageUpdatedEventName : 'page:updated';

  function searchDomAndInitBehaviors(context) {
    if(context === undefined) {
      context = document;
    }
    var all = context.querySelectorAll('[data-behavior]');
    var i = -1;
    while (all[++i]) {
      var currentElement = all[i];

      // check to see if this element has had its behaviors already initialized by looking for _A17BehaviorsActive
      if (!currentElement._A17BehaviorsActive) {
        //console.log('initializing behaviors for:\n', currentElement);
        var behaviors = currentElement.getAttribute('data-behavior');
        var splittedBehaviors = behaviors.split(' ');
        for (var j = 0, k = splittedBehaviors.length; j < k; j++) {
          var ThisBehavior = Behaviors[splittedBehaviors[j]];
          if(typeof ThisBehavior !== 'undefined') {
            try {
              // mark the element as having its behaviors initialized
              currentElement._A17BehaviorsActive = true;

              // add this instance to the activeBehaviors object so it can be interrogated if the page is updated later
              activeBehaviors[idCounter] = {
                el: currentElement,
                behavior: new ThisBehavior(currentElement),
                name: splittedBehaviors[j]
              };

              try {
                activeBehaviors[idCounter].behavior.init();
              } catch (err) {
                console.warn('failed to init behavior: ', activeBehaviors[idCounter].name, '\n', err, activeBehaviors[idCounter]);
              }

              idCounter++;
            } catch(err) {
              console.error(err, currentElement, ThisBehavior);
            }
          }
        }
      } else {

        //console.log('behaviors already initialized for:\n', currentElement);
      }
    }
  }

  function pageUpdated() {
    // first check if anything was removed and clean up
    for (var activeBehaviorObj in activeBehaviors) {
      if (activeBehaviors.hasOwnProperty(activeBehaviorObj)) {
        var thisBehaviorObj = activeBehaviors[activeBehaviorObj];

        // check if the element is still there
        if (!document.body.contains(thisBehaviorObj.el)) {
          //console.log('element no longer exists:\n', thisBehaviorObj.name, thisBehaviorObj);

          // trigger its destroy if its gone
          try {
            thisBehaviorObj.behavior.destroy();
            delete activeBehaviors[activeBehaviorObj];
          } catch (err) {
            //console.log('failed to destroy behavior: ', thisBehaviorObj.name, '\n', err, thisBehaviorObj);
          }
        } else {

          //console.log('element still exists:\n', thisBehaviorObj.name, thisBehaviorObj);
        }
      }
    }

    // now look for new behaviors!
    searchDomAndInitBehaviors();
  }

  searchDomAndInitBehaviors();
  document.addEventListener(pageUpdatedEventName, pageUpdated);
  document.addEventListener('content:updated', function() {
    searchDomAndInitBehaviors( (event.data.el) ? event.data.el : '' );
  });
};

export default manageBehaviors;
