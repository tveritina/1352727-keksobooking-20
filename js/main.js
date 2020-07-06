'use strict';

(function () {
  // Активация страницы
  var activatePage = function () {
    window.map.activateMap();
    window.data.getOffers();
  };

  // Активация страницы и разблокировка
  var mainMapPin = document.querySelector('.map__pin--main');

  var onMouseDownActivateMap = function (evt) {
    if (evt.button === 0 || evt.code === 'Enter') {
      activatePage();
      window.map.blockMapFilter(false);
      window.offerForm.blockFormFilter(false);
      window.offerForm.activateForm();
      window.offerForm.fillAddress();
      mainMapPin.removeEventListener('mousedown', onMouseDownActivateMap);
      mainMapPin.removeEventListener('keydown', onMouseDownActivateMap);
    }
  };

  mainMapPin.addEventListener('mousedown', onMouseDownActivateMap);
  mainMapPin.addEventListener('keydown', onMouseDownActivateMap);

  window.main = {
    halfActiveMainPinWidth: 31,
    activeMainPinHeight: 84,
    halfMainPinHeight: 31,
    minMainPinYCoord: 130,
    maxMainPinYCoord: 630,
    defaultMainPinLeftCoord: 570,
    defaultMainPinTopCoord: 375,
    addActivateMainPinListener: function () {
      mainMapPin.addEventListener('mousedown', onMouseDownActivateMap);
      mainMapPin.addEventListener('keydown', onMouseDownActivateMap);
    }
  };
})();
