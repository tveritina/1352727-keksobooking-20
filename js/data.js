'use strict';

(function () {
  window.rentList = [];

  var onSuccess = function (data) {
    window.rentList = data;

    return window.rentList;
  };

  window.load('https://javascript.pages.academy/keksobooking/data', onSuccess);
})();
