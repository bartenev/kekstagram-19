'use strict';
(function () {
  // var NUMBER_OF_POSTS = 25;

  var posts = [];
  // for (var i = 1; i <= NUMBER_OF_POSTS; i++) {
  //   posts.push(window.data.createPost(i));
  // }

  var createPostElement = function (post) {
    var postElement = pictureTemplate.cloneNode(true);
    postElement.querySelector('.picture__img').src = post.url;
    postElement.querySelector('.picture__likes').textContent = post.likes;
    postElement.querySelector('.picture__comments').textContent = String(post.comments.length);
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

  var pictureListElement = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var onSuccessLoad = function (uploadPosts) {
    posts = uploadPosts;
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < posts.length; j++) {
      fragment.appendChild(createPostElement(posts[j]));
    }
    pictureListElement.appendChild(fragment);
  };

  var onErrorLoad = function (errorMessage) {
    window.backend.createErrorBlock(errorMessage);
  };

  window.backend.load(onSuccessLoad, onErrorLoad);

  var getPost = function (index) {
    return posts[index];
  };

  window.gallery = {
    getPost: getPost,
    getComment: createCommentElement
  };
})();
