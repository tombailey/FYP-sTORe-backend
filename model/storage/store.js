/*jshint esversion: 6 */
const uploadOne = (googleStorageBucket) => {
  return (path, buffer) => {
    return new Promise((resolve, reject) => {
      var fileStream = googleStorageBucket.file(path).createWriteStream();

      fileStream.on("error", (error) => {
        reject(error);
      });
      fileStream.on("finish", () => {
        resolve(path);
      });
      fileStream.end(buffer);
    });
  };
};

const uploadMany = (googleStorageBucket) => {
  return (paths, buffers) => {
    var upload = uploadOne(googleStorageBucket);
    var uploadPromises = [];
    for (var index in paths) {
      uploadPromises.push(upload(paths[index], buffers[index]));
    }

    return Promise.all(uploadPromises);
  };
};

const makePublic = (googleStorageBucket) => {
  return (path) => {
    return new Promise((resolve, reject) => {
      googleStorageBucket.file(path).makePublic().then(() => {
        resolve(path);
      }).catch((err) => {
        reject(err);
      });
    });
  };
};

const uploadOneAndMakePublic = (googleStorageBucket) => {
  return (path, buffer) => {
    var upload = uploadOne(googleStorageBucket);
    return upload(path, buffer).then((path) => {
      return makePublic(googleStorageBucket)(path);
    });
  };
};

const uploadManyAndMakePublic = (googleStorageBucket) => {
  return (paths, buffers) => {
    var uploadAndMakePublic = uploadOneAndMakePublic(googleStorageBucket);
    var uploadAndMakePublicPromises = [];
    for (var index in paths) {
      uploadAndMakePublicPromises.push(
        uploadAndMakePublic(paths[index], buffers[index]));
    }

    return Promise.all(uploadAndMakePublicPromises);
  };
};

module.exports = (googleStorageBucket) => {
  return {
    "uploadOne": uploadOne(googleStorageBucket),
    "uploadMany": uploadMany(googleStorageBucket),
    "makePublic": makePublic(googleStorageBucket),
    "uploadOneAndMakePublic": uploadOneAndMakePublic(googleStorageBucket),
    "uploadManyAndMakePublic": uploadManyAndMakePublic(googleStorageBucket)
  };
};
