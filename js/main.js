'use strict';

// Активация страницы
var activatePage = function () {
  window.activateMap();
  window.generateOffersPins();
  window.addActivePinListener();
};

// Активация страницы и разблокировка
var mainMapPin = document.querySelector('.map__pin--main');
mainMapPin.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    activatePage();
    window.blockMapFilter(false);
    window.blockFormFilter(false);
    window.fillAddress();
    window.activateForm();
  }
});

mainMapPin.addEventListener('keydown', function (evt) {
  if (evt.code === 'Enter') {
    activatePage();
    window.blockMapFilter(false);
    window.blockFormFilter(false);
    window.fillAddress();
    window.activateForm();
  }
});
