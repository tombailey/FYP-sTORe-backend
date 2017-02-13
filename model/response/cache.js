/*jshint esversion: 6 */
const SECS_IN_MINUTE = 60;
const SECS_IN_HOUR = 60 * SECS_IN_MINUTE;

const times = (modifier) => {
  return {
    "hours": (x) => {
      return modifier + ", max=" + (SECS_IN_HOUR * x);
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
