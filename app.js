/*jshint esversion: 6 */
const LIFECYCLE = process.env.LIFECYCLE || "lcl";
const CONFIG = require("./config/" + LIFECYCLE);


console.log("Lifecycle is " + LIFECYCLE);

setupMongoose()
	.then(setupExpress)
	.catch((error) => {
		console.error("setup failed", error);
	});

function setupMongoose() {
  return new Promise((resolve, reject) => {
    var mongoose = require("mongoose");

    var configUrl = "mongodb://";
    if (CONFIG.mongoose.username !== undefined &&
      CONFIG.mongoose.password !== undefined) {
      configUrl += CONFIG.mongoose.username + ":" + CONFIG.mongoose.password + "@";
    }
    configUrl += CONFIG.mongoose.host + ":" + CONFIG.mongoose.port + "/" +
      CONFIG.mongoose.database;

    mongoose.connect(configUrl, {
      "config": {
        "autoIndex": CONFIG.mongoose.autoIndex
      }
    }, () => {
      var Application = require("./model/entity/application")(mongoose);
      var Developer = require("./model/entity/developer")(mongoose);

      resolve({
        "mongoose": mongoose,
        "entities": {
          "Application": Application,
          "Developer": Developer
        }
      });
    });
  });
}

function setupExpress(database) {
  var app = require("express")();
  setupEndpoints(app, database.mongoose, database.entities);
  app.listen(CONFIG.express.port);
  return app;
}

function setupEndpoints(app, mongoose, entities) {
  require("./model/endpoint/application")(app, mongoose, entities);
  require("./model/endpoint/developer")(app, mongoose, entities);
}
