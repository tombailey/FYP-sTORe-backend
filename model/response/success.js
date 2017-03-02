/*jshint esversion: 6 */
const ok = (res, data, cache) => {
  success(res, 200, data, cache);
};

const created = (res, data, cache) => {
  success(res, 201, data, cache);
};

const success = (res, status, data, cache) => {
  if (cache) {
    res.set("Cache-control", cache);
  }

  res.status(status).json({
    "data": data
  });
};

module.exports = {
  "ok": ok,
  "created": created
};
