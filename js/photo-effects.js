'use strict';

(function () {
  var formEditImage = document.querySelector('.img-upload__overlay');
  var effectLevel = formEditImage.querySelector('.effect-level');
  var effectLevelLine = formEditImage.querySelector('.effect-level__line');
  var effectLevelPin = formEditImage.querySelector('.effect-level__pin');
  var effectLevelDepth = formEditImage.querySelector('.effect-level__depth');
  var effectLevelInput = formEditImage.querySelector('.effect-level__value');
  var image = formEditImage.querySelector('.img-upload__preview');
  var saturationLevel = 0;

  var scaleControl = formEditImage.querySelector('.scale__control--value');
  var scaleControlSmaller = formEditImage.querySelector('.scale__control--smaller');
  var scaleControlBigger = formEditImage.querySelector('.scale__control--bigger');

  var effects = [
    {
      name: 'grayscale',
      class: 'effects__preview--chrome',
      unit: '',
      formula: function (ratio) {
        return ratio / 100;
      }
    },
    {
      name: 'sepia',
      class: 'effects__preview--sepia',
      unit: '',
      formula: function (ratio) {
        return ratio / 100;
      }
    },
    {
      name: 'invert',
      class: 'effects__preview--marvin',
      unit: '%',
      formula: function (ratio) {
        return ratio;
      }
    },
    {
      name: 'blur',
      class: 'effects__preview--phobos',
      unit: 'px',
      formula: function (ratio) {
        return ratio / 100 * 3;
      }
    },
    {
      name: 'brightness',
      class: 'effects__preview--heat',
      unit: '',
      formula: function (ratio) {
        return ratio / 100 * 2 + 1;
      }
    }
  ];

  var onScaleControlClick = function (evt) {
    var currentScaleControl = evt.target;
    var step = 25;
    var desiredValue = 0;
    if (currentScaleControl.classList.contains('scale__control--smaller')) {
      desiredValue = (Number(scaleControl.value.substring(0, scaleControl.value.indexOf('%'))) - step);
    } else {
      desiredValue = (Number(scaleControl.value.substring(0, scaleControl.value.indexOf('%'))) + step);
    }

    if (desiredValue >= 25 && desiredValue <= 100) {
      scaleControl.value = desiredValue + '%';
      image.querySelector('#image-preview').style.transform = 'scale(' + desiredValue / 100 + ')';
    }
  };

  scaleControlSmaller.addEventListener('click', onScaleControlClick);
  scaleControlBigger.addEventListener('click', onScaleControlClick);

  var getSaturationLevel = function () {
    var effectLevelPinX = effectLevelPin.getBoundingClientRect().left;
    var effectLevelPinWidth = effectLevelPin.getBoundingClientRect().width;
    var effectLevelLineX = effectLevelLine.getBoundingClientRect().left;
    var effectLevelLineWidth = effectLevelLine.getBoundingClientRect().width;

    return Math.round(((effectLevelPinX - effectLevelLineX + (effectLevelPinWidth / 2)) * 100) / effectLevelLineWidth);
  };

  var setEffect = function (ratio) {
    var index = window.utilities.getIndexOfArrayElement(image.classList[1], effects, 'class');
    image.style.filter = '';
    if (index > -1) {
      image.style.filter = effects[index].name + '(' + effects[index].formula(ratio) + effects[index].unit + ')';
    }
  };

  var setBaseFilterValues = function () {
    var basicValue = effectLevelLine.getBoundingClientRect().width;
    effectLevelPin.style.left = basicValue + 'px';
    effectLevelDepth.style.width = basicValue + 'px';
    effectLevelInput.value = 100;
  };

  var resetEffects = function () {
    setBaseFilterValues();
    effectLevel.classList.add('hidden');
    document.querySelector('#effect-none').checked = true;
    image.querySelector('#image-preview').style.transform = 'scale(1)';
    scaleControl.value = '100%';
    if (image.classList.length > 1) {
      image.classList.remove(image.classList[1]);
      image.style.filter = '';
    }
  };

  effectLevelPin.addEventListener('mousedown', function (evt) {
    var minLevelEffect = 0;
    var maxLevelEffect = effectLevelLine.getBoundingClientRect().width;
    var startCoordX = evt.clientX;

    var onMouseMove = function (moveEvt) {
      var shiftX = startCoordX - moveEvt.clientX;
      startCoordX = moveEvt.clientX;

      var desiredLevel = effectLevelPin.offsetLeft - shiftX;

      if (desiredLevel > minLevelEffect && desiredLevel < maxLevelEffect) {
        saturationLevel = getSaturationLevel();
        effectLevelPin.style.left = (effectLevelPin.offsetLeft - shiftX) + 'px';
        effectLevelDepth.style.width = effectLevelPin.style.left;
        effectLevelInput.value = saturationLevel;
        setEffect(saturationLevel);
      } else {
        // onMouseUp();
      }
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var onEffectPreviewClick = function (clickEvt) {
    if (clickEvt.target.classList.contains('effects__preview')) {
      var effect = clickEvt.target.classList[1];
      if (image.classList.length > 1) {
        image.classList.remove(image.classList[1]);
      }

      image.classList.add(effect);
      setEffect(100);
      image.querySelector('#image-preview').style.transform = 'scale(' + 1 + ')';
      scaleControl.value = '100%';

      if (clickEvt.target.classList.contains('effects__preview--none')) {
        effectLevel.classList.add('hidden');
      } else {
        effectLevel.classList.remove('hidden');
        setBaseFilterValues();
      }
    }
  };

  document.addEventListener('click', onEffectPreviewClick);

  window.photoEffects = {
    resetEffects: resetEffects
  };
})();
