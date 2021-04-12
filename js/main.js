'use strict';

var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var NAMES = ['Илья', 'Никита', 'Алина', 'Влад', 'Глеб', 'Наташа', 'Кирилл', 'Георгий', 'Алена', 'Александр'];

var NUMBER_OF_POSTS = 25;
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
  post.description = '';
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

