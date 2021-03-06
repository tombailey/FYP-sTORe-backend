/*jshint esversion: 6 */
module.exports = (app, mongoose, entities) => {

  const bcrypt = require("bcrypt");

  const error = require("../response/error");
  const success = require("../response/success");

  const developerService =
    require("../service/developerService")(mongoose, entities.Developer);

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


    bcrypt.hash(password, 16).then((err, hash) => {
      return developerService.create(name, hash);
    }).then((developer) => {
      success.created({
        "id": developer.id
      });
    }).catch((err) => {
      console.error(err);
      error.internalServerError(res, "server issue");
    });
  });

};
