/*jshint esversion: 6 */
const create = (mongoose, Developer) => {
  return (name, encryptedPassword) => {
    return new Promise((resolve, reject) => {
      Developer.create({
        "name": name.toLowerCase(),
        "password": encryptedPassword
      }, (error, developer) => {
        if (error) {
          reject(error);
        } else {
          resolve(developer);
        }
      });
    });
  };
};

const getByName = (mongoose, Developer) => {
  return (name, attrs) => {
    return findOne(mongoose, Developer)({
      "name": name.toLowerCase()
    }, attrs);
  };
};

const findOne = (mongoose, Developer) => {
  return (where, attrs) => {
    return new Promise((resolve, reject) => {
      Developer.findOne(where, attrs, (error, developer) => {
        if (error) {
          reject(error);
        } else {
          resolve(developer);
        }
      });
    });
  };
};

module.exports = (mongoose, Developer) => {
  return {
    "create": create(mongoose, Developer),
    "getByName": getByName(mongoose, Developer)
  };
};
