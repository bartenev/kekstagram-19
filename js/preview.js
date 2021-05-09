'use strict';

(function () {
  var bigPictureElement = document.querySelector('.big-picture');
  var closeButtonOfBigPicture = bigPictureElement.querySelector('#picture-cancel');
  var inputNewComment = bigPictureElement.querySelector('.social__footer-text');
  var commentsListElement = bigPictureElement.querySelector('.social__comments');
  var post;

  var createElement = function (tagName, className) {
    var element = document.createElement(tagName);
    element.classList.add(className);
    return element;
  };

  var createCommentElement = function (post, commentNumber) {
    var commentElement = createElement('li', 'social__comment');

    var commentAvatarElement = createElement('img', 'social__picture');
    commentAvatarElement.src = post.comments[commentNumber].avatar;
    commentAvatarElement.alt = post.comments[commentNumber].name;
    commentAvatarElement.width = 35;
    commentAvatarElement.height = 35;
    commentElement.appendChild(commentAvatarElement);

    var commentTextElement = createElement('p', 'social__text');
    commentTextElement.textContent = post.comments[commentNumber].message;
    commentElement.appendChild(commentTextElement);

    return commentElement;
  };

  var openBigPhoto = function (element) {
    var firstHalfNameOfPhoto = 'photos/';
    var startOfIndexNumber = element.src.indexOf(firstHalfNameOfPhoto) + firstHalfNameOfPhoto.length;
    var endOfIndexNumber = element.src.indexOf('.');
    var indexOfElement = element.src.substring(startOfIndexNumber, endOfIndexNumber) - 1;
    post = window.gallery.getPost(indexOfElement);
    var loadMoreComments = bigPictureElement.querySelector('.comments-loader');

    bigPictureElement.querySelector('.big-picture__img').children[0].src = post.url;
    bigPictureElement.querySelector('.likes-count').textContent = post.likes;
    bigPictureElement.querySelector('.comments-count').textContent = String(post.comments.length);
    bigPictureElement.querySelector('.social__caption').textContent = post.description;

    commentsListElement.innerHTML = '';
    loadMoreComments.classList.remove('hidden');
    renderComments(post, indexOfElement);

    bigPictureElement.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', onBigPhotoEcsPress);

    loadMoreComments.addEventListener('click', onLoadMoreCommentsClick);
  };

  var onLoadMoreCommentsClick = function () {
    renderComments();
  };

  var renderComments = function () {
    var numberDisplayedComments = commentsListElement.children.length;
    var numberUnseenComments = post.comments.length - commentsListElement.children.length;
    var numberRenderComments = numberUnseenComments > 5 ? 5 : post.comments.length - numberDisplayedComments;

    numberUnseenComments -= numberRenderComments;

    if (!numberUnseenComments) {
      bigPictureElement.querySelector('.comments-loader').classList.add('hidden');
    }

    document.querySelector('.comments-count--current').textContent = numberDisplayedComments + numberRenderComments;

    var commentsFragment = document.createDocumentFragment();
    for (var k = numberDisplayedComments; k < numberDisplayedComments + numberRenderComments; k++) {
      commentsFragment.appendChild(createCommentElement(post, k));
    }
    commentsListElement.appendChild(commentsFragment);
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
