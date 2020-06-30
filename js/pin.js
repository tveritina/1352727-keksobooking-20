'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var pin = document.querySelector('#pin')
    .content
    .querySelector('button');

  window.pin = {
    generateOffersPins: function () {
      var rentList = window.rentList;
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < rentList.length; i++) {
        var element = pin.cloneNode(true);
        var pinImg = element.querySelector('img');

        element.style.left = rentList[i].location.x + 'px';
        element.style.top = rentList[i].location.y + 'px';
        pinImg.src = rentList[i].author.avatar;
        pinImg.alt = rentList[i].offer.title;

        fragment.appendChild(element);
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
      pins.forEach(function(item) {
        item.remove();
      });
    }
  };
})();
