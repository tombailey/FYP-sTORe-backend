/*jshint esversion: 6 */
const create = (mongoose, Application) => {
  return (name, description, featureGraphicLink, iconLink, screenshotLinks, versionNumber, versionName, binaryLink, categories) => {
    return new Promise((resolve, reject) => {
      Application.create({
        "name": name,
        "description": description,
        "featureGraphicLink": featureGraphicLink,
        "iconLink": iconLink,
        "screenshots": screenshotLinks,
        "versions": [{
          "number": versionNumber,
          "name": versionName,
          "binaryLink": binaryLink,
        }], "categories": categories
      }, (error, application) => {
        if (error) {
          reject(error);
        } else {
          resolve(application);
        }
      });
    });
  };
};

const createVersion = (mongoose, Application) => {
  return (applicationId, versionNumber, versionName, binaryLink) => {
    return new Promise((resolve, reject) => {
      Application.findOneAndUpdate({
        "id": applicationId
      }, {
        "$push": {
          "versions": {
            "number": versionNumber,
            "name": versionName,
            "binaryLink": binaryLink,
          }
        }
      }, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  };
};

const createReview = (mongoose, Application) => {
  return (applicationId, description, stars) => {
    return new Promise((resolve, reject) => {
      Application.findOneAndUpdate({
        "id": applicationId
      }, {
        "$push": {
          "reviews": {
            "description": description,
            "stars": stars
          }
        }
      }, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  };
};

const getApplication = (mongoose, Application) => {
  return (applicationId, attrs) => {
    findOne(mongoose, Application)({
      "id": applicationId,
    }, attrs);
  };
};

const searchByCategory = (mongoose, Application) => {
  return (category, sortBy, sortDirection, page) => {
    var sort = {};
    sort[sortBy] = sortDirection;

    return findMany(mongoose, Application)({
      "categories": category,
      "reviewStatus": "accepted"
    }, "id name description featureGraphic iconLink downloadCount currentVersion screenshots categories", sort);
  };
};

const searchByKeywords = (mongoose, Application) => {
  return (keywords, page, attrs) => {
    return new Promise((resolve, reject) => {
      Application.find({
        "reviewStatus": "accepted",
        "$text": {
          "$search": keywords
        }
      }, "id name description featureGraphic iconLink downloadCount currentVersion screenshots categories", {
        "score": {
          "$meta": "textScore"
        }
      }, (error, applications) => {
        if (error) {
          reject(error);
        } else {
          resolve(applications);
        }
      });
    });
  };
};

const findOne = (mongoose, Application) => {
  return (where, attrs) => {
    return new Promise((resolve, reject) => {
      Application.findOne(where, attrs, (error, application) => {
        if (error) {
          reject(error);
        } else {
          resolve(application);
        }
      });
    });
  };
};

const findMany = (mongoose, Application) => {
  return (where, attrs, sort) => {
    return new Promise((resolve, reject) => {
      Application.find(where, attrs, {
        "sort": sort
      }, (error, applications) => {
        if (error) {
          reject(error);
        } else {
          resolve(applications);
        }
      });
    });
  };
};

module.exports = (mongoose, Application) => {
  return {
    "create": create(mongoose, Application),
    "getApplication": getApplication(mongoose, Application),
    "searchByCategory": searchByCategory(mongoose, Application),
    "searchByKeywords": searchByKeywords(mongoose, Application)
  };
};
