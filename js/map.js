'use strict';

(function () {
  window.activateMap = function () {
    var map = document.querySelector('.map');
    map.classList.remove('map--faded');
  };

  // Блокировка фильтра
  window.blockMapFilter = function (state) {
    var mapFilter = document.querySelectorAll('.map__filters .map__filter');
    var mapFeaturesFilter = document.querySelector('.map__filters .map__features');

    for (var i = 0; i < mapFilter.length; i++) {
      mapFilter[i].disabled = state;
    }

    mapFeaturesFilter.disabled = state;
  };

  blockMapFilter(true);
})();
