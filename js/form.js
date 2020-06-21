'use strict';

(function () {
  var HALF_MAIN_PIN_X = 31;
  var MAIN_PIN_Y = 84;

  var form = document.querySelector('.ad-form');
  var adressInput = document.querySelector('#address');

  window.offerForm = {
    activateForm: function () {
      form.classList.remove('ad-form--disabled');
    },

    // Заполнение поля адреса
    fillAddress: function () {
      var mainPin = document.querySelector('.map__pin--main');
      var mainPinLocationTop = parseInt(mainPin.style.top, 10);
      var mainPinLocationLeft = parseInt(mainPin.style.left, 10);

      adressInput.value = (Math.round(mainPinLocationTop + MAIN_PIN_Y)) + ', ' + (Math.round(mainPinLocationLeft + HALF_MAIN_PIN_X));
    },

    // Блокирует поля формы при открытии страницы
    blockFormFilter: function (state) {
      var formFieldsets = document.querySelectorAll('.ad-form fieldset');
      for (var i = 0; i < formFieldsets.length; i++) {
        formFieldsets[i].disabled = state;
      }
    }
  };

  window.offerForm.fillAddress();

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
})();
