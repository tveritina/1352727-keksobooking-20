'use strict';

(function () {
  window.rentList = [];

  window.data = {
    getOffers: function () {
      window.load('https://javascript.pages.academy/keksobooking/data', function (data) {
        window.rentList = data;

        return window.rentList;
      });
    }
  };
})();
