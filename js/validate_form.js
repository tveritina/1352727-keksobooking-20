'use strict';

(function () {
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;
  var MAX_PRICE_VALUE = 1000000;

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
    var minValueErrorText = 'Минимальная цена ';

    var priceRange = {
      minValue: {
        forPalace: 10000,
        forHouse: 5000,
        forFlat: 1000,
        forBungalo: 0,
      },
    };

    switch (typeValue) {
      case 'palace':
        offerPrice.placeholder = priceRange.minValue.forPalace;
        break;

      case 'house':
        offerPrice.placeholder = priceRange.minValue.forHouse;
        break;

      case 'flat':
        offerPrice.placeholder = priceRange.minValue.forFlat;
        break;

      case 'bungalo':
        offerPrice.placeholder = priceRange.minValue.forBungalo;
        break;
    }

    if (typeValue === 'palace' && offerPrice.value < priceRange.minValue.forPalace) {
      offerPrice.setCustomValidity(minValueErrorText + priceRange.minValue.forPalace);
    } else if (typeValue === 'house' && offerPrice.value < priceRange.minValue.forHouse) {
      offerPrice.setCustomValidity(minValueErrorText + priceRange.minValue.forHouse);
    } else if (typeValue === 'flat' && offerPrice.value < priceRange.minValue.forFlat) {
      offerPrice.setCustomValidity(minValueErrorText + priceRange.minValue.forFlat);
    } else {
      offerPrice.setCustomValidity('');
    }
  };
})();
