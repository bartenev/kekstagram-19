'use strict';

(function () {
  var statusCode = {
    OK: 200,
    clientSideError: 400,
    serverSideError: 500
  };
  var errorRange = 100;
  var node;

  var request = function (onLoad, onError, URL, method, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.OK) {
        onLoad(xhr.response);
        if (node) {
          node.style.display = 'none';
        }
      } else if (xhr.status >= statusCode.clientSideError && xhr.status < statusCode.clientSideError + errorRange) {
        onError('Ошибка: ' + xhr.status + ' ' + xhr.statusText + '. Перезагрузите страницу и попробуйте еще раз');
      } else if (xhr.status >= statusCode.serverSideError && xhr.status < statusCode.serverSideError + errorRange) {
        onError('Ошибка сервера: ' + xhr.status + ' ' + xhr.statusText + '. Попробуйте позже');
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения.');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.open(method, URL);
    xhr.send(data);
  };

  var load = function (onLoad, onError) {
    request(onLoad, onError, 'https://js.dump.academy/kekstagram/data', 'GET');
  };

  var save = function (data, onLoad, onError) {
    request(onLoad, onError, 'https://echo.htmlacademy.ru', 'POST', data);
  };

  window.backend = {
    load: load,
    save: save
  };

})();
