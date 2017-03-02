/*jshint esversion: 6 */
const SECS_IN_MINUTE = 60;
const SECS_IN_HOUR = 60 * SECS_IN_MINUTE;
const SECS_IN_DAY = 24 * SECS_IN_HOUR;

const times = (modifier) => {
  return {
    "hours": (x) => {
      return modifier + ", max-age=" + (SECS_IN_HOUR * x);
    }, "days": (x) => {
      return modifier + ", max-age=" + (SECS_IN_DAY * x);
    }
  };
};

module.exports = {
  "public": () => {
    return times("public");
  }, "private": () => {
    return times("private");
  }
};
