'use strict';

(function () {
  var getRandomNumber = function (maxNum, minNum, roundingType) {
    var randomNumber = 0;

    if (!minNum) {
      minNum = 0;
    }

    if (roundingType === 'ceil') {
      randomNumber = minNum + Math.ceil(Math.random() * (maxNum - minNum));
    } else if (roundingType === 'floor') {
      randomNumber = minNum + Math.floor(Math.random() * (maxNum - minNum));
    } else {
      randomNumber = minNum + Math.round(Math.random() * (maxNum - minNum));
    }

    return randomNumber;
  };

  var getIndexOfArrayElement = function (value, array, key) {
    var index = 0;
    var isFind = false;
    while (!isFind && index < array.length) {
      if (key) {
        if (value === array[index][key]) {
          isFind = true;
        } else {
          index++;
        }
      } else {
        if (value === array[index]) {
          isFind = true;
        } else {
          index++;
        }
      }
    }

    if (!isFind) {
      index = -1;
    }

    return index;
  };

  window.utilities = {
    getRandomNumber: getRandomNumber,
    getIndexOfArrayElement: getIndexOfArrayElement
  };
})();
