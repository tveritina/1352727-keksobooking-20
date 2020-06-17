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
var HALF_MAIN_PIN_X = 31;
var MAIN_PIN_Y = 84;
var MIN_TITLE_LENGTH = 30;
var MAX_TITLE_LENGTH = 100;
var MAX_PRICE_VALUE = 1000000;

var mapPins = document.querySelector('.map__pins');
var adressInput = document.querySelector('#address');
var form = document.querySelector('.ad-form');
var pin = document.querySelector('#pin')
  .content
  .querySelector('button');

// var card = document.querySelector('#card')
//   .content
//   .querySelector('article');

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

var activateMap = function () {
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');
};

var generateOffersPins = function () {
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
};

// Активация карты
var activatePage = function () {
  activateMap();
  generateOffersPins();
  addActivePinListener();
};

// Блокирует поля формы при открытии страницы
var blockFormFilter = function (state) {
  var formFieldsets = document.querySelectorAll('.ad-form fieldset');
  for (var i = 0; i < formFieldsets.length; i++) {
    formFieldsets[i].disabled = state;
  }
};

// Блокировка фильтра
var blockMapFilter = function (state) {
  var mapFilter = document.querySelectorAll('.map__filters .map__filter');
  var mapFeaturesFilter = document.querySelector('.map__filters .map__features');

  for (var i = 0; i < mapFilter.length; i++) {
    mapFilter[i].disabled = state;
  }

  mapFeaturesFilter.disabled = state;
};

blockMapFilter(true);

var activateForm = function () {
  form.classList.remove('ad-form--disabled');
};

// Активация страницы и разблокировка
var mainMapPin = document.querySelector('.map__pin--main');
mainMapPin.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    activatePage();
    blockMapFilter(false);
    blockFormFilter(false);
    fillAddress();
    activateForm();
  }
});

mainMapPin.addEventListener('keydown', function (evt) {
  if (evt.code === 'Enter') {
    activatePage();
    blockMapFilter(false);
    blockFormFilter(false);
    fillAddress();
    activateForm();
  }
});

// Заполнение поля адреса
var fillAddress = function () {
  var mainPin = document.querySelector('.map__pin--main');
  var mainPinLocationTop = parseInt(mainPin.style.top, 10);
  var mainPinLocationLeft = parseInt(mainPin.style.left, 10);

  adressInput.value = (Math.round(mainPinLocationTop + MAIN_PIN_Y)) + ', ' + (Math.round(mainPinLocationLeft + HALF_MAIN_PIN_X));
};

fillAddress();

// Валидация количества гостей
var roomsSelect = document.querySelector('#room_number');
var capacitySelect = document.querySelector('#capacity');

capacitySelect.addEventListener('change', function () {
  validateGuests();
});

roomsSelect.addEventListener('change', function () {
  validateGuests();
});

var validateGuests = function () {
  if (capacitySelect.value > roomsSelect.value) {
    capacitySelect.setCustomValidity('Гостям будет тесно, выберите меньшее количество гостей');
  } else if (roomsSelect.value === 100 && capacitySelect.value > 0 || roomsSelect.value !== 100 && capacitySelect.value === 0) {
    capacitySelect.setCustomValidity('Для 100 комнат доступен только вариант Не для гостей');
  } else {
    capacitySelect.setCustomValidity('');
  }
};

/*
var generateCard = function (rentListElement) {
  var cardElement = card.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = rentListElement.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = rentListElement.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = rentListElement.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__text--capacity').textContent = rentListElement.offer.rooms + ' комнат для ' + rentListElement.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + rentListElement.offer.checkin + ', выезд до ' + rentListElement.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = rentListElement.offer.description;
  cardElement.querySelector('.popup__avatar').src = rentListElement.author.avatar;

  cardElement.querySelector('.popup__features').innerHTML = '';
  for (i = 0; i < rentListElement.offer.features.length; i++) {
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
};

generateCard(rentList[0]);
*/


var addActivePinListener = function () {
  var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

  for (var i = 0; i < pins.length; i++) {
    pins[i].addEventListener('click', function (evt) {

      for (var j = 0; j < pins.length; j++) {
        pins[j].classList.remove('map__pin--active');
      }

      evt.currentTarget.classList.add('map__pin--active');
    });
  };
};

// Валидация заголовка
var offerTitle = document.querySelector('#title');

offerTitle.addEventListener('input', function () {
  var valueLength = offerTitle.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    offerTitle.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_TITLE_LENGTH) {
    offerTitle.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
  } else {
    offerTitle.setCustomValidity('');
  }
});

// Валидация цены
var offerPrice = document.querySelector('#price');

offerPrice.addEventListener('invalid', function () {
  if (offerPrice.value.length === 0) {
    offerPrice.setCustomValidity('Введите число');
  }
  else {
    offerPrice.setCustomValidity('');
  };
});

offerPrice.addEventListener('input', function () {
  var parsedValue = parseInt(offerPrice.value, 10);

  if (isNaN(parsedValue) === true) {
    offerPrice.setCustomValidity('Введите число');
  } else if (parsedValue > MAX_PRICE_VALUE) {
    offerPrice.setCustomValidity('Значение не может быть больше 1 000 000');
  } else {
    offerPrice.setCustomValidity('');
  }
});


// Валидация цены в зависимости от типа жилья
var homeType = document.querySelector('#type');

homeType.addEventListener('change', function () {
  validatePriceByHomeType();
});

offerPrice.addEventListener('input', function () {
  validatePriceByHomeType();
});

var validatePriceByHomeType = function () {
  var typeValue = homeType.value;

  switch (typeValue) {
    case 'palace':
      offerPrice.placeholder = '10000';
      break;

    case 'house':
      offerPrice.placeholder = '5000';
      break;

    case 'flat':
      offerPrice.placeholder = '1000';
      break;

    case 'bungalo':
      offerPrice.placeholder = '0';
      break;
  }

  if (typeValue === 'palace' && offerPrice.value < 10000) {
    offerPrice.setCustomValidity('Минимальная цена 10 000');
  } else if (typeValue === 'house' && offerPrice.value < 5000) {
    offerPrice.setCustomValidity('Минимальная цена 5 000');
  } else if (typeValue === 'flat' && offerPrice.value < 1000) {
    offerPrice.setCustomValidity('Минимальная цена 1 000');
  } else {
    offerPrice.setCustomValidity('');
  }
};

// Ручное редактирование адреса запрещено
adressInput.disabled = true;

// Синхронизация времени заезда/выезда
var checkinTime = document.querySelector('#timein');
var checkoutTime = document.querySelector('#timeout');

var syncCheckoutTime = function () {
  checkoutTime.value = checkinTime.value;
};
var syncCheckinTime = function () {
  checkinTime.value = checkoutTime.value;
};

checkinTime.addEventListener('change', syncCheckoutTime);
checkoutTime.addEventListener('change', syncCheckinTime);
