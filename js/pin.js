'use strict';

(function () {
  var MAX_PINS_COUNT = 5;

  var mapPins = document.querySelector('.map__pins');
  var pin = document.querySelector('#pin')
    .content
    .querySelector('button');

  var renderPin = function (offer) {
    var element = pin.cloneNode(true);
    var pinImg = element.querySelector('img');

    element.style.left = offer.location.x + 'px';
    element.style.top = offer.location.y + 'px';
    pinImg.src = offer.author.avatar;
    pinImg.alt = offer.offer.title;

    return element;
  };

  window.pin = {
    generateOffersPins: function () {
      var rentList = window.rentList;
      var fragment = document.createDocumentFragment();

      var offersCount = rentList.length > MAX_PINS_COUNT ? MAX_PINS_COUNT : rentList.length;

      for (var i = 0; i < offersCount; i++) {
        fragment.appendChild(renderPin(rentList[i]));
      }

      mapPins.appendChild(fragment);
    },

    // Добавление обработчика для добавления класса метки и генерации карточки
    addActivePinListener: function () {
      var rentList = window.rentList;
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

      for (var i = 0; i < pins.length; i++) {
        pins[i].addEventListener('click', function (evt) {

          for (var j = 0; j < pins.length; j++) {
            pins[j].classList.remove('map__pin--active');
          }

          evt.currentTarget.classList.add('map__pin--active');
        });
      }

      for (i = 0; i < pins.length; i++) {
        (function (x) {
          pins[x].addEventListener('click', function () {
            window.card.removeCardPopups();
            window.card.generateCard(rentList[x]);
          });
        })(i);

        (function (x) {
          pins[x].addEventListener('keydown', function (evt) {
            if (evt.code === 'Enter') {
              window.card.removeCardPopups();
              window.card.generateCard(rentList[x]);
            }
          });
        })(i);
      }
    },

    // Удаление меток после отправки формы
    removePins: function () {
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      pins.forEach(function (item) {
        item.remove();
      });
    }
  };
})();
