'use strict';

(function () {
  var StatusCode = {
    OK: 200,
  };

  window.load = function (url, onSuccess) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      }
    });

    xhr.open('GET', url);
    xhr.send();
  };
})();
