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

  window.utilities = {
    getRandomNumber: getRandomNumber
  };
})();
