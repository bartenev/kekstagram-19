'use strict';
(function () {
  // var NUMBER_OF_POSTS = 25;
  var NUMBER_OF_RANDOM_POSTS = 10;
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

  var pictureListElement = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var renderPosts = function (postsArray) {
    deleteRenderPosts();
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < postsArray.length; j++) {
      fragment.appendChild(createPostElement(postsArray[j]));
    }
    pictureListElement.appendChild(fragment);
  };

  var deleteRenderPosts = function () {
    while (pictureListElement.querySelector('.picture')) {
      var picture = pictureListElement.querySelector('.picture');
      picture.remove();
    }
  };

  var discussedPostsFilter = function () {
    var discussedPosts = posts.slice().
      sort(function (left, right) {
        var likesDiff = right.comments.length - left.comments.length;
        return likesDiff;
      });
    return discussedPosts;
  };

  var randomPostsFilter = function () {
    var arrayOfIndex = [];
    var arrayOfRandomPosts = [];
    var isElementWasFound = false;
    for (var i = 0; i < NUMBER_OF_RANDOM_POSTS; i++) {
      isElementWasFound = false;
      while (!isElementWasFound) {
        var currentIndex = window.utilities.getRandomNumber(posts.length, 0, 'floor');
        if (window.utilities.getIndexOfArrayElement(currentIndex, arrayOfIndex) === -1) {
          arrayOfRandomPosts.push(posts[currentIndex]);
          arrayOfIndex.push(currentIndex);
          isElementWasFound = true;
        }
      }
    }
    return arrayOfRandomPosts;
  };

  var changeFilter = window.debounce(function (filter) {
    switch (filter) {
      case 'filter-default':
        renderPosts(posts);
        break;
      case 'filter-random':
        renderPosts(randomPostsFilter());
        break;
      case 'filter-discussed':
        renderPosts(discussedPostsFilter());
        break;
    }
  });

  var onFilterClick = function (evt) {
    if ((evt.target.classList.contains('img-filters__button') && !evt.target.classList.contains('img-filters__button--active')) || evt.target.id === 'filter-random') {
      document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      changeFilter(evt.target.id);
    }
  };

  var onSuccessLoad = function (uploadPosts) {
    posts = uploadPosts;
    renderPosts(posts);
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
    document.addEventListener('click', onFilterClick);
  };

  var onErrorLoad = function (errorMessage) {
    //window.backend.createErrorBlock(errorMessage);
  };

  window.backend.load(onSuccessLoad, onErrorLoad);

  var getPost = function (index) {
    return posts[index];
  };

  window.gallery = {
    getPost: getPost,
  };
})();
