'use strict';

(function () {
  var filteredOffers = [];
  var houseTypeFilter = document.querySelector('#housing-type');

  var filterByType = function () {
    var typeValue = houseTypeFilter.value;

    filteredOffers = window.rentList.filter(function (item) {
      if (typeValue === 'any') {
        return window.rentList;
      } else {
        return item.offer.type === typeValue;
      }
    });

    window.card.removeCardPopups();

    window.pin.removePins();
    window.pin.generateOffersPins(filteredOffers);
    window.pin.addActivePinListener(filteredOffers);
  };

  houseTypeFilter.addEventListener('change', filterByType);
})();
