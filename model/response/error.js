/*jshint esversion: 6 */
const badRequest = (res, message) => {
  error(res, 400, message);
};

const notFound = (res, message) => {
  error(res, 404, message);
};

const internalServerError = (res, message) => {
  error(res, 500, message);
};

const error = (res, status, message) => {
  res.status(status).json({
    "errors": [{
      "code": status,
      "message": message
    }]
  });
};

module.exports = {
  "badRequest": badRequest,
  "notFound": notFound,
  "internalServerError": internalServerError
};
