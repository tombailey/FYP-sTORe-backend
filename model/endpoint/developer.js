/*jshint esversion: 6 */
module.exports = (app, mongoose, entities) => {

  const bcrypt = require("bcrypt");

  const error = require("../response/error");
  const success = require("../response/success");

  const developerService =
    require("../service/developerService")(mongoose, entities.Developer);
  const sessionService =
    require("../service/sessionService")(mongoose, entities.Session);

  app.post("/api/developers", (req, res) => {
    var name = req.body.name;
    if (name === undefined) {
      error.badRequest(res, "name is required");
      return;
    } else if (name.length <= 4 && name.length >= 32) {
      error.badRequest(res, "name length is invalid. Needs to be <= 8 and >= 32");
      return;
    }

    var password = req.body.password;
    if (password === undefined) {
      error.badRequest(res, "password is required");
      return;
    } else if (password.length <= 8 && password.length >= 32) {
      //required as bcrypt has a password length limit
      error.badRequest(res, "password length is invalid. Needs to be <= 8 and >= 32");
      return;
    }


    bcrypt.hash(password, 16).then((hash) => {
      return developerService.create(name, hash);
    }).then((developer) => {
      success.created(res, {
        "registered": true,
        "id": developer.id
      });
    }).catch((err) => {
      console.error(err);
      error.internalServerError(res, "server issue");
    });
  });

  app.post("/api/developers/sessions", (req, res) => {
    var name = req.body.name;
    if (name === undefined) {
      error.badRequest(res, "name is required");
      return;
    } else if (name.length <= 4 && name.length >= 32) {
      error.badRequest(res, "name length is invalid. Needs to be <= 8 and >= 32");
      return;
    }

    var password = req.body.password;
    if (password === undefined) {
      error.badRequest(res, "password is required");
      return;
    } else if (password.length <= 8 && password.length >= 32) {
      //required as bcrypt has a password length limit
      error.badRequest(res, "password length is invalid. Needs to be <= 8 and >= 32");
      return;
    }


    developerService.getByName(developerName).then((developer) => {
      return new Promise((resolve, reject) => {
        bcrypt.compare(developerPassword, developer.password).then((passwordMatches) => {
          if (passwordMatches) {
            resolve(developer.id);
          } else {
            reject({
              "code": 403,
              "message": "credentials incorrect"
            });
          }
        });
      });
    }).then((developerId) => {
      return sessionService.create(developerId);
    }).then((session) => {
      success.created(res, {
        "created": true,
        "sessionId": session.id
      });
    }).catch((err) => {
      console.error(err);
      if (err.code && err.message) {
        error.error(res, err);
      } else {
        error.internalServerError(res, "internal server error");
      }
    });
  });

};
