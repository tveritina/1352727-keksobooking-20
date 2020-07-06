'use strict';

(function () {
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;
  var MAX_PRICE_VALUE = 1000000;

  var minPrice = {
    FOR_PALACE: 10000,
    FOR_HOUSE: 5000,
    FOR_FLAT: 1000,
    FOR_BUNGALO: 0,
  };

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
    var capacityValue = parseInt(capacitySelect.value, 10);
    var roomsValue = parseInt(roomsSelect.value, 10);

    if (capacityValue > roomsValue) {
      capacitySelect.setCustomValidity('Гостям будет тесно, выберите меньшее количество гостей');
    } else if (roomsValue === 100 && capacityValue > 0 || roomsValue !== 100 && capacityValue === 0) {
      capacitySelect.setCustomValidity('Для 100 комнат доступен только вариант "Не для гостей"');
    } else {
      capacitySelect.setCustomValidity('');
    }
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
    } else {
      offerPrice.setCustomValidity('');
    }
  });

  offerPrice.addEventListener('input', function () {
    var parsedValue = parseInt(offerPrice.value, 10);

    if (isNaN(parsedValue)) {
      offerPrice.setCustomValidity('Введите число');
    } else if (parsedValue > MAX_PRICE_VALUE) {
      offerPrice.setCustomValidity('Значение не может быть больше ' + MAX_PRICE_VALUE);
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
    var minValueErrorText = 'Минимальная цена ';

    switch (typeValue) {
      case 'palace':
        offerPrice.placeholder = minPrice.FOR_PALACE;
        break;

      case 'house':
        offerPrice.placeholder = minPrice.FOR_HOUSE;
        break;

      case 'flat':
        offerPrice.placeholder = minPrice.FOR_FLAT;
        break;

      case 'bungalo':
        offerPrice.placeholder = minPrice.FOR_BUNGALO;
        break;
    }

    if (typeValue === 'palace' && offerPrice.value < minPrice.FOR_PALACE) {
      offerPrice.setCustomValidity(minValueErrorText + minPrice.FOR_PALACE);
    } else if (typeValue === 'house' && offerPrice.value < minPrice.FOR_HOUSE) {
      offerPrice.setCustomValidity(minValueErrorText + minPrice.FOR_HOUSE);
    } else if (typeValue === 'flat' && offerPrice.value < minPrice.FOR_FLAT) {
      offerPrice.setCustomValidity(minValueErrorText + minPrice.FOR_FLAT);
    } else {
      offerPrice.setCustomValidity('');
    }
  };
})();
