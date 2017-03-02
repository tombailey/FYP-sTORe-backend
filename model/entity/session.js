/*jshint esversion: 6 */
module.exports = (mongoose, uuidV4) => {

  var sessionSchema = new mongoose.Schema({
    "_id": {
      "type": String,
      "default": uuidV4()
    }, "validUntil": {
      "type": Date,
      "required": true,
      "default": Date.now()
    }, "developer": {
      "id": {
        "type": mongoose.Schema.Types.ObjectId,
        "required": true
      }
    }
  });

  sessionSchema.index({
    "_id": 1,
    "validUntil": 1
  });

  return mongoose.model("Session", sessionSchema);
};
