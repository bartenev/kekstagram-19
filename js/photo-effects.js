'use strict';

(function () {
  var formEditImage = document.querySelector('.img-upload__overlay');
  var effectLevelPin = formEditImage.querySelector('.effect-level__pin');
  var effectLevelLine = formEditImage.querySelector('.effect-level__line');
  var saturationLevel = 0;

  var getSaturationLevel = function () {
    var effectLevelPinX = effectLevelPin.getBoundingClientRect().left;
    var effectLevelPinWidth = effectLevelPin.getBoundingClientRect().width;
    var effectLevelLineX = effectLevelLine.getBoundingClientRect().left;
    var effectLevelLineWidth = effectLevelLine.getBoundingClientRect().width;

    return ((effectLevelPinX - effectLevelLineX + (effectLevelPinWidth / 2)) * 100) / effectLevelLineWidth;
  };

  effectLevelPin.addEventListener('mouseup', function () {
    saturationLevel = getSaturationLevel();
  });
})();
