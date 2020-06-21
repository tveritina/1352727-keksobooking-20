'use strict';

(function () {
  // Активация страницы
  var activatePage = function () {
    window.map.activateMap();
    window.pin.generateOffersPins();
    window.pin.addActivePinListener();
  };

  // Активация страницы и разблокировка
  var mainMapPin = document.querySelector('.map__pin--main');

  mainMapPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      activatePage();
      window.map.blockMapFilter(false);
      window.offerForm.blockFormFilter(false);
      window.offerForm.fillAddress();
      window.offerForm.activateForm();
    }
  });

  mainMapPin.addEventListener('keydown', function (evt) {
    if (evt.code === 'Enter') {
      activatePage();
      window.map.blockMapFilter(false);
      window.offerForm.blockFormFilter(false);
      window.offerForm.fillAddress();
      window.offerForm.activateForm();
    }
  });
})();
