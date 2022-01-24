var oritentationChangeFix = function() {
  // https://stackoverflow.com/questions/2557801/how-do-i-reset-the-scale-zoom-of-a-web-app-on-an-orientation-change-on-the-iphon
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/oritentationChangeFix

  if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
    var viewportmeta = document.querySelector('meta[name="viewport"]');
    if (viewportmeta) {
      viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0';
      document.body.addEventListener('gesturestart', function () {
        viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
      }, false);
    }
  }
};

export default oritentationChangeFix;
