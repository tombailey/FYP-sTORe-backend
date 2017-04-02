/*jshint esversion: 6 */
const create = (mongoose, Session) => {
  return (developerId) => {
    return new Promise((resolve, reject) => {
      Session.create({
        "developer": {
          "id": developerId
        }
      }, (error, session) => {
        if (error) {
          reject(error);
        } else {
          resolve(session);
        }
      });
    });
  };
};

const getSession = (mongoose, Session) => {
  return (sessionId) => {
    return new Promise((resolve, reject) => {
      Session.findOne({
        "_id": sessionId
      }, "developer.id validUntil", (error, session) => {
        if (error) {
          reject(error);
        } else if (session === undefined || session === null) {
          reject({
            "code": 401,
            "message": "session does not exist"
          });
        } else if (session.validUntil < Date.now()) {
          reject({
            "code": 401,
            "message": "session has expired"
          });
        } else {
          resolve({
            "developer": {
              "id": session.developer.id
            }
          });
        }
      });
    });
  };
};

module.exports = (mongoose, Session) => {
  return {
    "create": create(mongoose, Session),
    "getSession": getSession(mongoose, Session)
  };
};
