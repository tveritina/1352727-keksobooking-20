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

  var filterByRooms = function (item) {
    return filterItems(roomsFilter, item.offer, 'rooms');
  };

  var filterByGuests = function (item) {
    return filterItems(guestsFilter, item.offer, 'guests');
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

  var filterByFeatures = function (item) {
    var selectedFeatures = featuresFilter.querySelectorAll('input:checked');

    return Array.from(selectedFeatures).every(function (feature) {
      return item.offer.features.includes(feature.value);
    });
  };

  var onFilterChange = function () {
    window.debounce(function () {
      filteredOffers = window.data.offers;

      filteredOffers = filteredOffers.filter(filterByType);
      filteredOffers = filteredOffers.filter(filterByPrice);
      filteredOffers = filteredOffers.filter(filterByRooms);
      filteredOffers = filteredOffers.filter(filterByGuests);
      filteredOffers = filteredOffers.filter(filterByFeatures);

      window.card.removeCardPopups();
      window.pin.removePins();
      window.pin.generateOffersPins(filteredOffers);
      window.pin.addActivePinListener(filteredOffers);
    });
  };

  window.filter = {
    resetMapFilters: function () {
      filter.reset();
    }
  };

  filter.addEventListener('change', onFilterChange);
})();
