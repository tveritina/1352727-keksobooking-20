'use strict';

(function () {
  var priceRange = {
    type: {
      low: 'low',
      middle: 'middle',
      high: 'high',
    },
    value: {
      min: 10000,
      max: 50000,
    },
  };

  var filteredOffers = [];
  var filter = document.querySelector('.map__filters');
  var houseTypeSelect = document.querySelector('#housing-type');
  var priceSelect = document.querySelector('#housing-price');
  var roomsSelect = document.querySelector('#housing-rooms');
  var guestsSelect = document.querySelector('#housing-guests');
  var featuresFieldset = document.querySelector('#housing-features');

  var filterItems = function (item, offer, key) {
    return item.value === 'any' ? true : item.value === offer[key].toString();
  };

  var filterByType = function (item) {
    return filterItems(houseTypeSelect, item.offer, 'type');
  };

  var onFilterChange = function () {
    filteredOffers = window.rentList;

    filteredOffers = filteredOffers.filter(filterByType);

    window.card.removeCardPopups();
    window.pin.removePins();
    window.pin.generateOffersPins(filteredOffers);
    window.pin.addActivePinListener(filteredOffers);
  };

  filter.addEventListener('change', onFilterChange);
})();
