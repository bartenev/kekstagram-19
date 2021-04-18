'use strict';
(function () {

  var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var NAMES = ['Илья', 'Никита', 'Алина', 'Влад', 'Глеб', 'Наташа', 'Кирилл', 'Георгий', 'Алена', 'Александр'];

  var createComment = function () {
    var comment = {};
    comment.avatar = 'img/avatar-' + window.utilities.getRandomNumber(6, 1) + '.svg';
    comment.name = NAMES[window.utilities.getRandomNumber(NAMES.length, 0, 'floor')];
    comment.message = MESSAGES[window.utilities.getRandomNumber(MESSAGES.length, 0, 'floor')];

    if (window.utilities.getRandomNumber(2, 1) === 2) {
      comment.message += ' ';
      comment.message += MESSAGES[window.utilities.getRandomNumber(MESSAGES.length, 0, 'floor')];
    }

    return comment;
  };

  var createPost = function (index) {
    var post = {};
    post.url = 'photos/' + index + '.jpg';
    post.description = 'Новая фотка!';
    post.likes = window.utilities.getRandomNumber(200, 15);

    var comments = [];
    var numberOfComments = window.utilities.getRandomNumber(10, 1);
    for (var j = 0; j < numberOfComments; j++) {
      var comment = createComment();
      comments.push(comment);
    }
    post.comments = comments;
    return post;
  };

  window.data = {
    createPost: createPost
  };
})();
