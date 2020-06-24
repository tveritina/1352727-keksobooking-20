'use strict';
(function () {
  var HALF_MAIN_PIN_X = 31;
  var MAIN_PIN_Y = 84;

  var mainMapPin = document.querySelector('.map__pin--main');

  mainMapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      // Координаты острого края метки
      var currentXmapPin = mainMapPin.offsetLeft - shift.x + HALF_MAIN_PIN_X;
      var currentYmapPin = mainMapPin.offsetTop - shift.y + MAIN_PIN_Y;

      if (currentYmapPin <= 630 && currentYmapPin >= 130) {
        mainMapPin.style.top = (mainMapPin.offsetTop - shift.y) + 'px';
      };

      if (currentXmapPin <= 1200 && currentXmapPin >= 0) {
        mainMapPin.style.left = (mainMapPin.offsetLeft - shift.x) + 'px';
      };

      window.offerForm.fillAddress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
