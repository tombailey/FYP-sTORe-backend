/*jshint esversion: 6 */
const badRequest = (res, message) => {
  errorResponse(res, 400, message);
};

const notFound = (res, message) => {
  errorResponse(res, 404, message);
};

const internalServerError = (res, message) => {
  errorResponse(res, 500, message);
};

const error = (res, error) => {
  if (error.code && error.message) {
    errorResponse(res, error.code, error.message);
  } else {
    errorResponse(res, 500, message);
  }
};

const errorResponse = (res, status, message) => {
  res.status(status).json({
    "errors": [{
      "code": status,
      "message": message
    }]
  });
};

module.exports = {
  "error": error,
  "badRequest": badRequest,
  "notFound": notFound,
  "internalServerError": internalServerError
};
