/*jshint esversion: 6 */
module.exports = (mongoose) => {

  var developerSchema = new mongoose.Schema({
    "name": {
      "type": String,
      "required": true,
      "validate": {
        "validator": (value) => {
          return /[A-Z0-9\-\ ]{4,32}/i.test(value);
        }
      }
    }, "password": {
      "type": String,
      "required": true
    }, "registrationDate": {
      "type": Date,
      "required": true,
      "default": new Date()
    }
  });

  developerSchema.index({
    "_id": 1
  });
  developerSchema.index({
    "registrationDate": 1
  });
  developerSchema.index({
    "name": 1,
    "password": 1
  });

  return mongoose.model("Developer", developerSchema);
};
