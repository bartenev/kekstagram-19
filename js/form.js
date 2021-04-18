'use strict';
(function () {
  var uploadFile = document.querySelector('#upload-file');
  var formEditImage = document.querySelector('.img-upload__overlay');
  var buttonCloseFormEditImage = formEditImage.querySelector('#upload-cancel');

  var onFormEditImageEcsPress = function (evt) {
    if (evt.key === 'Escape') {
      if (evt.target.tagName.toLowerCase() === 'input' || evt.target.tagName.toLowerCase() === 'textarea') {
        evt.target.blur();
      } else {
        closeFormEditImage();
      }
    }
  };

  var openFormEditImage = function () {
    formEditImage.classList.remove('hidden');
    document.addEventListener('keydown', onFormEditImageEcsPress);
  };

  var closeFormEditImage = function () {
    formEditImage.classList.add('hidden');
    uploadFile.value = '';
    formEditImage.querySelector('.text__hashtags').value = '';
    formEditImage.querySelector('.text__description').value = '';
    document.removeEventListener('keydown', onFormEditImageEcsPress);
  };

  uploadFile.addEventListener('change', function () {
    openFormEditImage();
  });

  buttonCloseFormEditImage.addEventListener('click', function () {
    closeFormEditImage();
  });
})();
