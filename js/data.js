'use strict';

(function () {

  var onSuccess = function (data) {
    window.data.offers = data;

    window.pin.generateOffersPins(window.data.offers);
    window.pin.addActivePinListener(window.data.offers);
  };

  window.data = {
    getOffers: function () {
      window.load('https://javascript.pages.academy/keksobooking/data', onSuccess);
    },
    offers: []
  };
})();
