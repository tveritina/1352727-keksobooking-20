'use strict';
(function () {
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
      var currentXmapPin = mainMapPin.offsetLeft - shift.x + window.main.halfActiveMainPinWidth;
      var currentYmapPin = mainMapPin.offsetTop - shift.y + window.main.activeMainPinHeight;

      if (currentYmapPin >= window.main.minMainPinYCoord && currentYmapPin <= window.main.maxMainPinYCoord) {
        mainMapPin.style.top = (mainMapPin.offsetTop - shift.y) + 'px';
      }

      if (currentXmapPin >= 0 && currentXmapPin <= window.map.getMapPinsWidth()) {
        mainMapPin.style.left = (mainMapPin.offsetLeft - shift.x) + 'px';
      }

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

  window.movePin = {
    toDefaultCoordinates: function () {
      mainMapPin.style.top = window.main.defaultMainPinTopCoord + 'px';
      mainMapPin.style.left = window.main.defaultMainPinLeftCoord + 'px';
    }
  };
})();
