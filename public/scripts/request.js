window.request = function(url) {
  var handleResponse = function(xHttp, callback) {
    xHttp.onreadystatechange = function() {
      if (xHttp.readyState == 4) {
        if (xHttp.status >= 200 && xHttp.status < 300) {
          callback(false, xHttp.status, xHttp.responseText);
        } else {
          callback(true, xHttp.status, xHttp.responseText);
        }
      }
    };
  };

  var get = function() {
    var xHttp = new XMLHttpRequest();
    xHttp.open("GET", url, true);
    xHttp.send();

    return {
      "then": function(callback) {
        handleResponse(xHttp, callback);
      }
    };
  };

  var body = function(method) {
    return function(params) {
      var xHttp = new XMLHttpRequest();
      xHttp.open(method, url, true);
      xHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

      var body = "";
      params.forEach(function(param, index) {
        body += param.name + "=" + param.value;
        if (index != params.length - 1) {
          body += "&";
        }
      });
      xHttp.send(body);

      return {
        "then": function(callback) {
          handleResponse(xHttp, callback);
        }
      };
    };
  };

  return {
    "get": get,
    "post": body("post"),
    "put": body("put")
  };
};
