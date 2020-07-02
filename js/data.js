'use strict';

(function () {
  window.rentList = [];

  var onSuccess = function (data) {
    window.rentList = data;

    window.pin.generateOffersPins();
    // window.pin.addActivePinListener();
  };

  window.data = {
    getOffers: function () {
      window.load('https://javascript.pages.academy/keksobooking/data', onSuccess);
    }
  };
})();
