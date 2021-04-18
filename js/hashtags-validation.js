'use strict';

(function () {
  var inputHashtags = document.querySelector('.text__hashtags');

  var basicValidationHashtags = function (hashtegs) {
    var isHashtegsValid = true;
    var MAX_NUMBER_OF_HASHTAGS = 5;
    var MAX_LENGTH_OF_ONE_HASHTAG = 20;

    for (var i = 0; i < hashtegs.length; i++) {
      isHashtegsValid = false;
      if (hashtegs[i].indexOf('#', 1) !== -1 || hashtegs[i] === '') {
        inputHashtags.setCustomValidity('Хэш-теги должны разделяться одним пробелом');
      } else if (hashtegs.length > MAX_NUMBER_OF_HASHTAGS) {
        inputHashtags.setCustomValidity('Количество хэш-тегов должно быть не более 5');
      } else if (hashtegs[i][0] !== '#') {
        inputHashtags.setCustomValidity('Хэш-теги должны начинается с символа #');
      } else if (hashtegs[i] === '#') {
        inputHashtags.setCustomValidity('Хеш-теги не могут состоять только из одной решётки');
      } else if (hashtegs[i].length > MAX_LENGTH_OF_ONE_HASHTAG) {
        inputHashtags.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
      } else {
        inputHashtags.setCustomValidity('');
        isHashtegsValid = true;
      }

      if (!isHashtegsValid) {
        break;
      }
    }
    return isHashtegsValid;
  };

  var validationOfSameHashtags = function (hashtegs) {
    var hashtegsIsValid = true;
    for (var k = 0; k < hashtegs.length; k++) {
      if (!hashtegsIsValid) {
        break;
      }
      for (var j = k + 1; j < hashtegs.length; j++) {
        hashtegsIsValid = false;
        if (hashtegs[k] === hashtegs[j]) {
          inputHashtags.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
        } else if (hashtegs[k].toLowerCase() === hashtegs[j].toLowerCase()) {
          inputHashtags.setCustomValidity('Хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом');
        } else {
          inputHashtags.setCustomValidity('');
          hashtegsIsValid = true;
        }

        if (!hashtegsIsValid) {
          break;
        }
      }
    }
    return hashtegsIsValid;
  };

  var validationHashtagCharacters = function (hashtegs) {
    var hashtegsIsValid = true;

    for (var n = 0; n < hashtegs.length; n++) {
      if (!hashtegsIsValid) {
        break;
      }
      for (var m = 0; m < hashtegs[n].length; m++) {
        var currentSymbol = hashtegs[n][m].toUpperCase();
        hashtegsIsValid = false;
        if (currentSymbol.match(/[A-Z]/g) || currentSymbol.match(/[А-Я]/g) || currentSymbol.match(/[0-9]/g) || currentSymbol === '#') {
          inputHashtags.setCustomValidity('');
          hashtegsIsValid = true;
        } else {
          inputHashtags.setCustomValidity(hashtegs[n][m] + ' запрещенный символ');
          break;
        }
      }
    }

    return hashtegsIsValid;
  };

  var isHashtagsValidity = function (hashtegs) {
    var hashtegsIsValid = false;

    hashtegsIsValid = basicValidationHashtags(hashtegs);

    if (hashtegsIsValid) {
      hashtegsIsValid = validationOfSameHashtags(hashtegs);
    }

    if (hashtegsIsValid) {
      hashtegsIsValid = validationHashtagCharacters(hashtegs);
    }
  };

  var onInputAddHashtag = function () {
    if (inputHashtags.value) {
      var hashtegs = inputHashtags.value.split(' ');
      isHashtagsValidity(hashtegs);
    } else {
      inputHashtags.setCustomValidity('');
    }
  };

  inputHashtags.addEventListener('input', onInputAddHashtag);

})();
