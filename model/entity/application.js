/*jshint esversion: 6 */
module.exports = (mongoose, jsonSelect) => {
  const VALID_REVIEW_STATUSES =  [
    "accepted",
    "pending",
    "rejected"
  ];
  const VALID_CATEGORIES = [
    "communication",
    "entertainment",
    "shopping",
    "communication"
  ];

  var applicationSchema = new mongoose.Schema({
    "_id": {
      "type": String,
      "required": true
    }, "name": {
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
      "validate": {
        "validator": (value) => {
          return value === null || /https?\:\/\/[A-Z0-9\-\.]+\/[A-Z0-9\-\.\/]+.png/i.test(value);
        }
      }
    }, "iconLink": {
      "type": String,
      "validate": {
        "validator": (value) => {
          return value === null || /https?\:\/\/[A-Z0-9\-\.]+\/[A-Z0-9\-\.\/]+.png/i.test(value);
        }
      }
    }, "downloadCount": {
      "type": Number,
      "required": true,
      "default": 0,
    }, "currentVersion": {
      "number": {
        "type": Number,
      }, "date": {
        "type": Date,
      }
    }, "ratings": {
      "count": {
        "type": Number,
        "required": true,
        "default": 0
      }, "total": {
        "type": Number,
        "required": true,
        "default": 0
      }
    }, "screenshot": {
      "links": {
        "type": [String],
        "validate": {
          "validator": (values) => {
            values.forEach((value) => {
              if (!/https?\:\/\/[A-Z0-9\-\.]+\/[A-Z0-9\-\.\/]+.png/i.test(value)) {
                return false;
              }
            });
            return true;
          }
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
              return /https?\:\/\/[A-Z0-9\-\.]+\/[A-Z0-9\-\.\/]+.apk/i.test(value);
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
        "validator": (values) => {
          values.forEach((value) => {
            if (VALID_CATEGORIES.indexOf(value) === -1) {
              return false;
            }
          });
          return true;
        }
      }
    }, "developer": {
      "id": {
        "type": mongoose.Schema.Types.ObjectId,
        "required": true
      }
    }
  }, {
    "toJSON": {
      "virtuals": true
    }
  });

  //calculate screenshot count and don't provide direct links to screenshots
  //from storage bucket (need to be proxied for privacy)
  applicationSchema.virtual("screenshotCount").get(function() {
    return this.screenshot.links.length;
  });

  //calculate average rating, rather than storing + update for each review
  applicationSchema.virtual("rating").get(function() {
    if (this.ratings.count > 0) {
      return this.ratings.total / this.ratings.count;
    } else {
      return 0;
    }
  });


  //by default, show these attributes when .toJson is called
  applicationSchema.plugin(jsonSelect, "_id name description downloadCount " +
    "currentVersion rating screenshotCount reviews categories developer");


  //index according to attribute compositions queried to speedup results
  applicationSchema.index({
    "_id": 1,
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
  applicationSchema.index({
    "_id": 1,
    "developer.id": 1
  });


  return mongoose.model("Application", applicationSchema);
};
