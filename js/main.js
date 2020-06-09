'use strict';

var FLAT_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var mapPins = document.querySelector('.map__pins');
var pin = document.querySelector('#pin')
  .content
  .querySelector('button');

var card = document.querySelector('#card')
  .content
  .querySelector('article');

var getRandomFromList = function (array) {
  return array[Math.floor((Math.random() * array.length))];
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getRandomInt = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};

var shuffleArray = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

var getElementWidth = function (element) {
  return element.offsetWidth;
};

var generateRandomArray = function (array) {
  var result = [];
  var resultLength = getRandomNumber(1, array.length);
  shuffleArray(array);

  for (var i = 0; i < resultLength; i++) {
    result.push(array[i]);
  }

  return result;
};

var rentList = [];

var generateRentList = function () {
  for (var i = 0; i < 8; i++) {
    rentList[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png',
      },
      offer: {
        title: 'Объявление №' + i,
        address: '600, 350',
        price: getRandomNumber(1000, 6000),
        type: getRandomFromList(FLAT_TYPE),
        rooms: getRandomNumber(1, 4),
        guests: getRandomNumber(1, 4),
        checkin: getRandomFromList(CHECKIN_TIME),
        checkout: getRandomFromList(CHECKOUT_TIME),
        features: generateRandomArray(FEATURES),
        description: 'Уютная квартира',
        photos: generateRandomArray(PHOTOS),
      },
      location: {
        x: getRandomInt(getElementWidth(mapPins)),
        y: getRandomNumber(130, 630),
      }
    };
  }

  return rentList;
};

generateRentList();

var map = document.querySelector('.map');
map.classList.remove('map--faded');

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

var cardElement = card.cloneNode(true);

cardElement.querySelector('.popup__title').textContent = rentList[0].offer.title;
cardElement.querySelector('.popup__text--address').textContent = rentList[0].offer.address;
cardElement.querySelector('.popup__text--price').textContent = rentList[0].offer.price + '₽/ночь';

cardElement.querySelector('.popup__text--capacity').textContent = rentList[0].offer.rooms + ' комнат для ' + rentList[0].offer.guests + ' гостей';
cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + rentList[0].offer.checkin + ', выезд до ' + rentList[0].offer.checkout;
cardElement.querySelector('.popup__description').textContent = rentList[0].offer.description;
cardElement.querySelector('.popup__avatar').src = rentList[0].author.avatar;

cardElement.querySelector('.popup__features').innerHTML = '';

for (i = 0; i < rentList[0].offer.features.length; i++) {
  var feature = '<li class="popup__feature popup__feature--' + rentList[0].offer.features[i] + '"></li>';
  cardElement.querySelector('.popup__features').insertAdjacentHTML('beforeend', feature);
}

cardElement.querySelector('.popup__photos').innerHTML = '';

for (i = 0; i < rentList[0].offer.photos.length; i++) {
  var photo = '<img src="' + rentList[0].offer.photos[i] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
  cardElement.querySelector('.popup__photos').insertAdjacentHTML('beforeend', photo);
}

switch (rentList[0].offer.type) {
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
