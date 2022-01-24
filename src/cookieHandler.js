var cookieHandler = {
  // Doc: https://github.com/area17/a17-behaviors/wiki/cookieHandler-create
  // Doc: https://github.com/area17/a17-behaviors/wiki/cookieHandler-delete
  // Doc: https://github.com/area17/a17-behaviors/wiki/cookieHandler-read

  create(name, value, days) {
    var expires = '';
    if (days) {
      var date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      expires = '; expires='+date.toGMTString();
    }
    document.cookie = name+'='+value+expires+'; path=/';
  },
  delete(name) {
    if (name) {
      this.create(name, '', -1);
    }
  },
  read(name) {
    if (name) {
      var nameEQ = name + '=';
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
          return c.substring(nameEQ.length, c.length);
        }
      }
      return null;
    }
    return null;
  }
};

export default cookieHandler;
