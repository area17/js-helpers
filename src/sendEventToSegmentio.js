var sendEventToSegmentio = function() {
  // Doc: https://github.com/area17/a17-behaviors/wiki/sentEventToSegmentio

  var analyticsReady = false;
  var tempStore = [];

  function pushAnalytics(data) {
    if (Object.getOwnPropertyNames(data).length > 0) {
      switch(data.type.toLowerCase()) {
        case 'track':
          analytics.track(data.name, data.properties || {});
          break;
        case 'page':
          analytics.page(data.category || '', data.name || '', data.properties || {});
          break;
        case 'identify':
          analytics.identify(data.userID || '', data.properties || {});
          break;
      }
    }
  }

  function pushOrStore(data) {
    if (analyticsReady) {
      pushAnalytics(data);
    } else {
      tempStore.push(data);
    }
  }

  function pushStored() {
    tempStore.forEach(function(obj, i) {
      pushAnalytics(obj);
      tempStore.splice(i, 1);
    });
  }

  function identify() {
    var userInfo = document.querySelector('meta[name=\''+name+'\']').getAttribute('content');
    if (userInfo) {
      userInfo = userInfo.split(',');
      var identifyProps = {};
      userInfo.forEach(function(item) {
        var pair = item.split(':');
        identifyProps[pair[0]] = pair[1];
      });
      pushOrStore({
        type: 'identify',
        userID: identifyProps.id || '',
        properties: identifyProps
      });
    }
  }

  function init() {
    if (typeof analytics !== undefined) {
      analytics.ready(function() {
        analytics.debug(false);
        analyticsReady = true;
        identify();
        pushStored();
      });
    } else {
      setTimeout(init, 1000);
    }
  }

  document.addEventListener('analytics', function(event) {
    pushOrStore(event.detail);
  });

  document.addEventListener('analytics_identify', identify);

  init();

};

export default sendEventToSegmentio;
