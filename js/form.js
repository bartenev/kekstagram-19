'use strict';
(function () {
  var uploadFile = document.querySelector('#upload-file');
  var formOverlay = document.querySelector('.img-upload__overlay');
  var formEditImage = document.querySelector('.img-upload__form');
  var buttonCloseFormEditImage = formOverlay.querySelector('#upload-cancel');
  var formSubmit = formEditImage.querySelector('.img-upload__submit');
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var uploadedImage = formOverlay.querySelector('#image-preview');


  var onFormEditImageEcsPress = function (evt) {
    if (evt.key === 'Escape') {
      if (evt.target.tagName.toLowerCase() === 'input' || evt.target.tagName.toLowerCase() === 'textarea') {
        evt.target.blur();
      } else if (!document.querySelector('.error')) {
        closeFormEditImage();
      }
    }
  };

  var openFormEditImage = function () {
    formOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onFormEditImageEcsPress);
  };

  var closeFormEditImage = function () {
    formOverlay.classList.add('hidden');
    uploadFile.value = '';
    formOverlay.querySelector('.text__hashtags').value = '';
    formOverlay.querySelector('.text__description').value = '';
    window.photoEffects.resetEffects();
    document.removeEventListener('keydown', onFormEditImageEcsPress);
  };

  uploadFile.addEventListener('change', function () {

    var file = uploadFile.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        uploadedImage.src = reader.result;
        openFormEditImage();
      });

      reader.readAsDataURL(file);
    }
  });

  buttonCloseFormEditImage.addEventListener('click', function () {
    closeFormEditImage();
  });

  var createAnnouncement = function (type) {
    formSubmit.textContent = 'Опубликовать';
    formSubmit.disabled = false;

    var announcementTemplate = document.querySelector('#' + type).content.querySelector('.' + type);
    var announcementElement = announcementTemplate.cloneNode(true);
    announcementElement.style.zIndex = '100';
    var closeButton = announcementElement.querySelector('.' + type + '__button');

    var onAnnouncementClose = function (evt) {
      if (evt.target.classList.contains(type) || evt.target === closeButton || evt.key === 'Escape') {
        announcementElement.remove();
        document.removeEventListener('click', onAnnouncementClose);
        closeFormEditImage();
      }
    };

    document.querySelector('main').appendChild(announcementElement);
    document.addEventListener('click', onAnnouncementClose);
    document.addEventListener('keydown', onAnnouncementClose);
  };

  var onSuccessSave = function () {
    createAnnouncement('success');
  };

  var onErrorSave = function () {
    createAnnouncement('error');
  };

  formEditImage.addEventListener('submit', function (evt) {
    evt.preventDefault();
    formSubmit.textContent = 'Отправка';
    formSubmit.disabled = true;
    window.backend.save(new FormData(formEditImage), onSuccessSave, onErrorSave);
  });

})();
