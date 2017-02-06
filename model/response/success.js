/*jshint esversion: 6 */
const ok = (res, data) => {
  success(res, 200, data);
};

const created = (res, data) => {
  success(res, 201, data);
};

const success = (res, status, data) => {
  res.status(status).json({
    "data": data
  });
};

module.exports = {
  "ok": ok,
  "created": created
};
