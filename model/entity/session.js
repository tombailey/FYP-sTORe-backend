/*jshint esversion: 6 */
module.exports = (mongoose, uuidV4) => {

  const MILLISECS_IN_HOUR = 60 * 60 * 1000;

  var sessionSchema = new mongoose.Schema({
    "_id": {
      "type": String,
      "default": uuidV4()
    }, "validUntil": {
      "type": Date,
      "required": true,
      "default": new Date(Date.now() + MILLISECS_IN_HOUR)
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
