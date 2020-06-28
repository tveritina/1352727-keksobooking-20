'use strict';

(function () {
  window.rentList = [];

  var onError = function (message) {
    console.error(message);
  };

  var onSuccess = function (data) {
    window.rentList = data;

    return window.rentList;
  };

  window.load('https://javascript.pages.academy/keksobooking/data', onSuccess, onError);
})();
