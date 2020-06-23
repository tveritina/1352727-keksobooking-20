'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var card = document.querySelector('#card')
    .content
    .querySelector('article');

  window.card = {
    generateCard: function (rentListElement) {
      var cardElement = card.cloneNode(true);

      cardElement.querySelector('.popup__title').textContent = rentListElement.offer.title;
      cardElement.querySelector('.popup__text--address').textContent = rentListElement.offer.address;
      cardElement.querySelector('.popup__text--price').textContent = rentListElement.offer.price + '₽/ночь';
      cardElement.querySelector('.popup__text--capacity').textContent = rentListElement.offer.rooms + ' комнат для ' + rentListElement.offer.guests + ' гостей';
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + rentListElement.offer.checkin + ', выезд до ' + rentListElement.offer.checkout;
      cardElement.querySelector('.popup__description').textContent = rentListElement.offer.description;
      cardElement.querySelector('.popup__avatar').src = rentListElement.author.avatar;

      cardElement.querySelector('.popup__features').innerHTML = '';
      for (var i = 0; i < rentListElement.offer.features.length; i++) {
        var feature = '<li class="popup__feature popup__feature--' + rentListElement.offer.features[i] + '"></li>';
        cardElement.querySelector('.popup__features').insertAdjacentHTML('beforeend', feature);
      }

      cardElement.querySelector('.popup__photos').innerHTML = '';
      for (i = 0; i < rentListElement.offer.photos.length; i++) {
        var photo = '<img src="' + rentListElement.offer.photos[i] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
        cardElement.querySelector('.popup__photos').insertAdjacentHTML('beforeend', photo);
      }

      switch (rentListElement.offer.type) {
        case ('flat'):
          cardElement.querySelector('.popup__type').textContent = 'Квартира';
          break;
        case ('bungalo'):
          cardElement.querySelector('.popup__type').textContent = 'Бунгало';
          break;
        case ('house'):
          cardElement.querySelector('.popup__type').textContent = 'Дом';
          break;
        case ('palace'):
          cardElement.querySelector('.popup__type').textContent = 'Дворец';
          break;
      }

      mapPins.insertAdjacentElement('afterend', cardElement);

      // Добавление обработчика закрытия карточки
      var popupCloseButton = document.querySelector('.popup__close');
      popupCloseButton.addEventListener('click', window.card.removeCardPopups);
      document.addEventListener('keydown', function (evt) {
        if (evt.code === 'Escape') {
          window.card.removeCardPopups();
        }
      });
    },

    removeCardPopups: function () {
      var cardPopups = document.querySelectorAll('.map__card');
      for (var i = 0; i < cardPopups.length; i++) {
        cardPopups[i].remove();
      }
    }
  };
})();
