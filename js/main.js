'use strict';

var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var NAMES = ['Илья', 'Никита', 'Алина', 'Влад', 'Глеб', 'Наташа', 'Кирилл', 'Георгий', 'Алена', 'Александр'];

var NUMBER_OF_POSTS = 25;

// Загрузка изображения и показ формы редактирования

var uploadFile = document.querySelector('#upload-file');
var formEditImage = document.querySelector('.img-upload__overlay');
var buttonCloseFormEditImage = formEditImage.querySelector('#upload-cancel');
var inputDescription = formEditImage.querySelector('.text__description');

var onFormEditImageEcsPress = function (evt) {
  if (evt.key === 'Escape') {
    if (evt.target === inputHashtags || evt.target === inputDescription) {
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
  document.removeEventListener('keydown', onFormEditImageEcsPress);
};

uploadFile.addEventListener('change', function () {
  openFormEditImage();
});

buttonCloseFormEditImage.addEventListener('click', function () {
  closeFormEditImage();
});

// Применение эффекта для изображения и редактирование размера изображения
// Определение уровня насыщенности для эффекта
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

// Валдиация хэштегов

var inputHashtags = formEditImage.querySelector('.text__hashtags');

var basicValidationHashtags = function (hashtegs) {
  var hashtegsIsValid = true;
  var MAX_NUMBER_OF_HASHTAGS = 5;
  var MAX_LENGTH_OF_ONE_HASHTAG = 20;

  for (var i = 0; i < hashtegs.length; i++) {
    hashtegsIsValid = false;
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
      hashtegsIsValid = true;
    }

    if (!hashtegsIsValid) {
      break;
    }
  }
  return hashtegsIsValid;
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
  var CODE_FIRST_NUMBER = 48;
  var CODE_LAST_NUMBER = 57;
  var CODE_FIRST_LATIN_SYMBOL = 65;
  var CODE_LAST_LATIN_SYMBOL = 90;
  var CODE_FIRST_CYRILLIC_SYMBOL = 1040;
  var CODE_LAST_CYRILLIC_SYMBOL = 1071;
  var CODE_HASH = 35;
  var hashtegsIsValid = true;

  for (var n = 0; n < hashtegs.length; n++) {
    if (!hashtegsIsValid) {
      break;
    }
    for (var m = 0; m < hashtegs[n].length; m++) {
      var currentSymbol = hashtegs[n].toUpperCase().charCodeAt(m);
      hashtegsIsValid = false;
      if (!((currentSymbol >= CODE_FIRST_NUMBER && currentSymbol <= CODE_LAST_NUMBER)
        || (currentSymbol >= CODE_FIRST_LATIN_SYMBOL && currentSymbol <= CODE_LAST_LATIN_SYMBOL)
        || (currentSymbol >= CODE_FIRST_CYRILLIC_SYMBOL && currentSymbol <= CODE_LAST_CYRILLIC_SYMBOL)
        || currentSymbol === CODE_HASH)) {
        inputHashtags.setCustomValidity(hashtegs[n][m] + ' запрещенный символ');
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

inputHashtags.addEventListener('change', function () {
  var hashtegs = inputHashtags.value.split(' ');
  isHashtagsValidity(hashtegs);
});

// Вывод постов на главную страницу

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

var createComment = function () {
  var comment = {};
  comment.avatar = 'img/avatar-' + getRandomNumber(6, 1) + '.svg';
  comment.name = NAMES[getRandomNumber(NAMES.length, 0, 'floor')];
  comment.message = MESSAGES[getRandomNumber(MESSAGES.length, 0, 'floor')];

  if (getRandomNumber(2, 1) === 2) {
    comment.message += ' ';
    comment.message += MESSAGES[getRandomNumber(MESSAGES.length, 0, 'floor')];
  }

  return comment;
};

var createPost = function (index) {
  var post = {};
  post.url = 'photos/' + index + '.jpg';
  post.description = 'Новая фотка!';
  post.likes = getRandomNumber(200, 15);

  var comments = [];
  var numberOfComments = getRandomNumber(10, 1);
  for (var j = 0; j < numberOfComments; j++) {
    var comment = createComment();
    comments.push(comment);
  }
  post.comments = comments;
  return post;
};

var createPostElement = function () {
  var postElement = pictureTemplate.cloneNode(true);
  postElement.querySelector('.picture__img').src = posts[j].url;
  postElement.querySelector('.picture__likes').textContent = posts[j].likes;
  postElement.querySelector('.picture__comments').textContent = String(posts[j].comments.length);
  return postElement;
};

var createElement = function (tagName, className) {
  var element = document.createElement(tagName);
  element.classList.add(className);
  return element;
};

var createCommentElement = function (postNumber, commentNumber) {
  var commentElement = createElement('li', 'social__comment');

  var commentAvatarElement = createElement('img', 'social__picture');
  commentAvatarElement.src = posts[postNumber].comments[commentNumber].avatar;
  commentAvatarElement.alt = posts[postNumber].comments[commentNumber].name;
  commentAvatarElement.width = 35;
  commentAvatarElement.height = 35;
  commentElement.appendChild(commentAvatarElement);

  var commentTextElement = createElement('p', 'social__text');
  commentTextElement.textContent = posts[postNumber].comments[commentNumber].message;
  commentElement.appendChild(commentTextElement);

  return commentElement;
};

var posts = [];
for (var i = 1; i <= NUMBER_OF_POSTS; i++) {
  posts.push(createPost(i));
}

var pictureListElement = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var fragment = document.createDocumentFragment();

for (var j = 0; j < posts.length; j++) {
  fragment.appendChild(createPostElement());
}
pictureListElement.appendChild(fragment);

var bigPictureElement = document.querySelector('.big-picture');
var closeButtonOfBigPicture = bigPictureElement.querySelector('#picture-cancel');
var inputNewComment = bigPictureElement.querySelector('.social__footer-text');

var openBigPhoto = function (element) {
  var firstHalfNameOfPhoto = 'photos/';
  var startOfIndexNumber = element.src.indexOf(firstHalfNameOfPhoto) + firstHalfNameOfPhoto.length;
  var endOfIndexNumber = element.src.indexOf('.');
  var indexOfElement = element.src.substring(startOfIndexNumber, endOfIndexNumber) - 1;

  // Показ изображения на весь экран
  bigPictureElement.querySelector('.social__comment-count').classList.add('hidden');
  bigPictureElement.querySelector('.comments-loader').classList.add('hidden');

  bigPictureElement.querySelector('.big-picture__img').children[0].src = posts[indexOfElement].url;
  bigPictureElement.querySelector('.likes-count').textContent = posts[indexOfElement].likes;
  bigPictureElement.querySelector('.comments-count').textContent = String(posts[indexOfElement].comments.length);
  bigPictureElement.querySelector('.social__caption').textContent = posts[indexOfElement].description;

  var commentsListElement = bigPictureElement.querySelector('.social__comments');
  commentsListElement.innerHTML = '';
  var commentsFragment = document.createDocumentFragment();

  for (var k = 0; k < posts[indexOfElement].comments.length; k++) {
    commentsFragment.appendChild(createCommentElement(indexOfElement, k));
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
