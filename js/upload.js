'use strict';

(function () {
    var URL = 'https://javascript.pages.academy/keksobooking';
    
    window.upload = function (data, onSuccess) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onSuccess(xhr.response);
        }
      });
      
      xhr.open('POST', URL);
      xhr.send(data);
    };
  })();
