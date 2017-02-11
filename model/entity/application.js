/*jshint esversion: 6 */
module.exports = (mongoose) => {
  const VALID_REVIEW_STATUSES =  [
    "accepted",
    "pending",
    "rejected"
  ];
  const VALID_CATEGORIES = [
    "communication",
    "communication",
    "communication",
    "communication"
  ];

  var applicationSchema = new mongoose.Schema({
    "name": {
      "type": String,
      "required": true,
      "validate": {
        "validator": (value) => {
          return /[A-Z0-9\-\ ]{4,64}/i.test(value);
        }
      }
    }, "description": {
      "type": String,
      "required": true,
      "validate": {
        "validator": (value) => {
          return /[A-Z0-9\-\.\,\ ]{64,1024}/i.test(value);
        }
      }
    }, "featureGraphicLink": {
      "type": String,
      "required": true,
      "validate": {
        "validator": (value) => {
          return /[A-Z0-9\-\.\,\ ]{64,1024}/i.test(value);
        }
      }
    }, "iconLink": {
      "type": String,
      "required": true,
      "validate": {
        "validator": (value) => {
          return /https?\:\/\/[A-Z0-9\-\.]+\/[A-Z0-9\-\.\/]+.png/i.test(value);
        }
      }
    }, "downloadCount": {
      "type": Number,
      "required": true,
      "default": 0,
    }, "currentVersion": {
      "number": {
        "type": Number,
        "required": true,
        "default": null,
      }, "date": {
        "type": Date,
        "required": true,
        "default": null,
      }
    }, "screenshots": {
      "type": [String],
      "required": true,
      "validate": {
        "validator": (value) => {
          return /https?\:\/\/[A-Z0-9\-\.]+\/[A-Z0-9\-\.\/]+.png/i.test(value);
        }
      }
    }, "versions": [{
        "number": {
          "type": Number,
          "required": true,
          "validate": {
            "validator": (value) => {
              return value === null || value >= 0;
            }
          }
        }, "binaryLink": {
          "type": String,
          "required": true,
          "validate": {
            "validator": (value) => {
              return /[A-Z0-9\-\.\,\ ]{64,1024}/.test(value);
            }
          }
        }, "name": {
          "type": String,
          "required": true,
          "validate": {
            "validator": (value) => {
              return /[A-Z0-9\.]+/.test(value);
            }
          }
        }, "reviewStatus": {
          "type": String,
          "required": true,
          "default": "pending",
          "validate": {
            "validator": (value) => {
              return VALID_REVIEW_STATUSES.indexOf(value) !== -1;
            }
          }
        }
    }], "reviews": [{
        "description": {
          "type": String,
          "required": true,
          "validate": {
            "validator": (value) => {
              return /[A-Z0-9\-\.\,\ ]{64,1024}/i.test(value);
            }
          }
        }, "stars": {
          "type": Number,
          "required": true,
          "validate": {
            "validator": (value) => {
              return value >= 1 && value <= 5;
            }
          }
        }, "date": {
          "type": Date,
          "required": true,
          "default": Date.now()
        }
    }], "categories": {
      "type": [String],
      "required": true,
      "validate": {
        "validator": (value) => {
          return VALID_CATEGORIES.indexOf(value) !== -1;
        }
      }
    }, "developer": {
      "id": {
        "type": mongoose.Schema.Types.ObjectId,
        "required": true
      }
    }
  });


  applicationSchema.index({
    "id": 1,
    "currentVersion.number": 1
  });
  applicationSchema.index({
    "categories": 1,
    "currentVersion.number": 1
  });
  applicationSchema.index({
    "name": "text",
    "currentVersion.number": 1
  });
  applicationSchema.index({
    "description": "text",
    "name": "text",
    "currentVersion.number": 1
  }, {
    "weights": {
      "description": 1,
      "name": 5
    }
  });
  applicationSchema.index({
    "categories": 1,
    "name": "text",
    "currentVersion.number": 1
  });
  applicationSchema.index({
    "categories": 1,
    "description": "text",
    "name": "text",
    "currentVersion.number": 1
  });
  applicationSchema.index({
    "categories": 1,
    "downloadCount": 1,
    "currentVersion.number": 1
  });
  applicationSchema.index({
    "developer.id": 1,
    "currentVersion.number": 1
  });


  return mongoose.model("Application", applicationSchema);
};
