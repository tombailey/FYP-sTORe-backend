/*jshint esversion: 6 */
const overrideRequest = (https) => {
  return (url, cache, req, res) => {
    var newReq = https.request(url, (newRes) => {
      var headers = newRes.headers;
      headers["cache-control"] = cache;

      res.writeHead(newRes.statusCode, headers);
      newRes.pipe(res);
    }).on("error", (err) => {
      console.error(err);
      res.status(500).json({
        "errors": [{
          "code": 500,
          "message": "file server issue"
        }]
      });
    });
    req.pipe(newReq);
  };
};


module.exports = (https) => {
  return {
    "overrideRequest": overrideRequest(https)
  };
};
