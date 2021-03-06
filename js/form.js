'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var adressInput = document.querySelector('#address');
  var resetFormButton = document.querySelector('.ad-form__reset');
  var ButtonType = {
    ESCAPE: 'Escape',
    MAIN_MOUSE_BUTTON: 0
  };

  window.offerForm = {
    activateForm: function () {
      form.classList.remove('ad-form--disabled');
    },

    deactivateForm: function () {
      form.classList.add('ad-form--disabled');
    },

    // Заполнение поля адреса
    fillAddress: function () {
      var mainPin = document.querySelector('.map__pin--main');
      var mainPinLocationTop = parseInt(mainPin.style.top, 10);
      var mainPinLocationLeft = parseInt(mainPin.style.left, 10);

      var fillAddressValue = function (mainPinWidth, mainPinHeight) {
        adressInput.value =
          (Math.round(mainPinLocationLeft + mainPinWidth)) +
          ', ' +
          (Math.round(mainPinLocationTop + mainPinHeight));
      };

      if (isActiveForm()) {
        fillAddressValue(window.main.halfActiveMainPinWidth, window.main.activeMainPinHeight);
      } else {
        fillAddressValue(window.main.halfActiveMainPinWidth, window.main.halfMainPinHeight);
      }
    },

    // Блокирует поля формы при открытии страницы
    blockFormFilter: function (state) {
      var formFieldsets = document.querySelectorAll('.ad-form fieldset');
      for (var i = 0; i < formFieldsets.length; i++) {
        formFieldsets[i].disabled = state;
      }
    }
  };

  var isActiveForm = function () {
    return !form.classList.contains('ad-form--disabled');
  };

  window.offerForm.blockFormFilter(true);
  window.offerForm.fillAddress();

  // Ручное редактирование адреса запрещено
  adressInput.readOnly = true;

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

  resetFormButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    deactivatePageAndResetform();
  });

  var showSuccessSentModal = function () {
    var mainElement = document.querySelector('main');
    var modal = document.querySelector('#success')
      .content
      .querySelector('.success')
      .cloneNode(true);

    mainElement.appendChild(modal);
    modal.addEventListener('click', onClickOrEscapeCloseSuccessSentModal);
    document.addEventListener('keydown', onClickOrEscapeCloseSuccessSentModal);
  };

  var onClickOrEscapeCloseSuccessSentModal = function (evt) {
    if (evt.button === ButtonType.MAIN_MOUSE_BUTTON || evt.code === ButtonType.ESCAPE) {
      removeModalByClass('.success');
      document.removeEventListener('keydown', onClickOrEscapeCloseSuccessSentModal);
    }
  };

  var showErrorSentModal = function () {
    var mainElement = document.querySelector('main');
    var modal = document.querySelector('#error')
      .content
      .querySelector('.error')
      .cloneNode(true);

    mainElement.appendChild(modal);
    modal.addEventListener('click', onClickOrEscapeCloseErrorSentModal);
    document.addEventListener('keydown', onClickOrEscapeCloseErrorSentModal);

    var errorButton = modal.querySelector('.error__button');
    errorButton.addEventListener('click', onClickRepeatButtonCloseErrorSentModal);
  };

  var onClickOrEscapeCloseErrorSentModal = function (evt) {
    if (evt.button === ButtonType.MAIN_MOUSE_BUTTON || evt.code === ButtonType.ESCAPE) {
      removeModalByClass('.error');
      document.removeEventListener('keydown', onClickOrEscapeCloseErrorSentModal);
    }
  };

  var onClickRepeatButtonCloseErrorSentModal = function () {
    removeModalByClass('.error');
  };

  var removeModalByClass = function (cssClass) {
    var modal = document.querySelector(cssClass);
    modal.remove();
  };

  var deactivatePageAndResetform = function () {
    window.card.removeCardPopups();
    window.pin.removePins();
    window.filter.resetMapFilters();

    window.map.deactivateMap();
    window.map.blockMapFilter(true);

    form.reset();
    window.offerForm.blockFormFilter(true);
    window.offerForm.deactivateForm();

    window.movePin.toDefaultCoordinates();
    window.offerForm.fillAddress();
    window.main.addActivateMainPinListener();
  };

  var onSuccessSent = function () {
    deactivatePageAndResetform();
    showSuccessSentModal();
  };

  var onErrorSent = function () {
    showErrorSentModal();
  };

  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), onSuccessSent, onErrorSent);
    evt.preventDefault();
  });
})();
