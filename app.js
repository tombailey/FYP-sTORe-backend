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
			var jsonSelect = require("mongoose-json-select");

      var Application = require("./model/entity/application")(mongoose, jsonSelect);
      var Developer = require("./model/entity/developer")(mongoose, jsonSelect);

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
	var bodyParser = require("body-parser");

	var multer  = require("multer");
	var upload = multer({
		"limits": {
			"fileSize": 1024 * 1024 * 100,
			"files": 10
		}, "storage": multer.memoryStorage()
	});

	var storage = require("google-cloud").storage({
		"projectId": CONFIG.google.projectId,
		"keyFilename": "./fyp-store-backend-58a9b731e7dd.json"
	});

  var app = require("express")();
	app.use(bodyParser.urlencoded());

  setupEndpoints(app, upload, database.mongoose, database.entities,
		storage.bucket(CONFIG.google.storage.bucketName));
  app.listen(CONFIG.express.port);
}

function setupEndpoints(app, upload, mongoose, entities, storageBucket) {
  require("./model/endpoint/application")(app, upload, mongoose, entities,
		storageBucket);
  require("./model/endpoint/developer")(app, mongoose, entities);
}
