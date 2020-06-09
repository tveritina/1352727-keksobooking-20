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
