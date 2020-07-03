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
  var houseTypeFilter = document.querySelector('#housing-type');
  var priceFilter = document.querySelector('#housing-price');
  var roomsFilter = document.querySelector('#housing-rooms');
  var guestsFilter = document.querySelector('#housing-guests');
  var featuresFilter = document.querySelector('#housing-features');

  var filterItems = function (item, offer, key) {
    return item.value === 'any' ? true : item.value === offer[key].toString();
  };

  var filterByType = function (item) {
    return filterItems(houseTypeFilter, item.offer, 'type');
  };

  var filterByPrice = function (item) {
    switch (priceFilter.value) {
      case priceRange.type.low:
        return item.offer.price < priceRange.value.min;
      case priceRange.type.middle:
        return item.offer.price >= priceRange.value.min && item.offer.price <= priceRange.value.max;
      case priceRange.type.high:
        return item.offer.price > priceRange.value.max;
    }
    return item;
  };

  var onFilterChange = function () {
    filteredOffers = window.rentList;

    filteredOffers = filteredOffers.filter(filterByType);
    filteredOffers = filteredOffers.filter(filterByPrice);

    window.card.removeCardPopups();
    window.pin.removePins();
    window.pin.generateOffersPins(filteredOffers);
    window.pin.addActivePinListener(filteredOffers);
  };

  filter.addEventListener('change', onFilterChange);
})();
