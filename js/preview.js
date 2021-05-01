'use strict';

(function () {
  var bigPictureElement = document.querySelector('.big-picture');
  var closeButtonOfBigPicture = bigPictureElement.querySelector('#picture-cancel');
  var inputNewComment = bigPictureElement.querySelector('.social__footer-text');

  var openBigPhoto = function (element) {
    var firstHalfNameOfPhoto = 'photos/';
    var startOfIndexNumber = element.src.indexOf(firstHalfNameOfPhoto) + firstHalfNameOfPhoto.length;
    var endOfIndexNumber = element.src.indexOf('.');
    var indexOfElement = element.src.substring(startOfIndexNumber, endOfIndexNumber) - 1;
    var post = window.gallery.getPost(indexOfElement);

    bigPictureElement.querySelector('.social__comment-count').classList.add('hidden');
    bigPictureElement.querySelector('.comments-loader').classList.add('hidden');

    bigPictureElement.querySelector('.big-picture__img').children[0].src = post.url;
    bigPictureElement.querySelector('.likes-count').textContent = post.likes;
    bigPictureElement.querySelector('.comments-count').textContent = String(post.comments.length);
    bigPictureElement.querySelector('.social__caption').textContent = post.description;

    var commentsListElement = bigPictureElement.querySelector('.social__comments');
    commentsListElement.innerHTML = '';
    var commentsFragment = document.createDocumentFragment();

    for (var k = 0; k < post.comments.length; k++) {
      commentsFragment.appendChild(window.gallery.getComment(indexOfElement, k));
    }
    commentsListElement.appendChild(commentsFragment);

    bigPictureElement.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', onBigPhotoEcsPress);
  };

  var onBigPhotoEcsPress = function (evt) {
    if (evt.key === 'Escape') {
      if (evt.target === inputNewComment) {
        evt.target.blur();
      } else {
        closeBigPhoto();
      }
    }
  };

  var closeBigPhoto = function () {
    bigPictureElement.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onBigPhotoEcsPress);
  };

  document.addEventListener('click', function (evt) {
    var currentElement = evt.target;
    if (currentElement.classList.contains('picture__img')) {
      openBigPhoto(currentElement);
    }
  });

  document.addEventListener('keydown', function (evt) {
    var currentElement = evt.target.querySelector('.picture__img');
    if (currentElement && evt.key === 'Enter') {
      openBigPhoto(currentElement);
    }
  });

  closeButtonOfBigPicture.addEventListener('click', function () {
    closeBigPhoto();
  });
})();
