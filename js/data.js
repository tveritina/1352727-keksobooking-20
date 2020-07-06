'use strict';

(function () {
  window.offers = [];

  var onSuccess = function (data) {
    window.offers = data;

    window.pin.generateOffersPins(window.offers);
    window.pin.addActivePinListener(window.offers);
  };

  window.data = {
    getOffers: function () {
      window.load('https://javascript.pages.academy/keksobooking/data', onSuccess);
    }
  };
})();
