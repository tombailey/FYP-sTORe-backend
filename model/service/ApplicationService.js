/*jshint esversion: 6 */
const DEFAULT_ATTRS = "_id name description downloadCount currentVersion " +
  "ratings screenshotCount categories";

const APPS_PER_PAGE = 20;


const create = (mongoose, Application) => {
  return (packageName, name, description, categories, developerId) => {
    return new Promise((resolve, reject) => {
      Application.create({
        "_id": packageName,
        "name": name,
        "description": description,
        "featureGraphicLink": null,
        "iconLink": null,
        "screenshots": [],
        "reviews": [],
        "versions": [],
        "categories": categories,
        "developer.id": developerId
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

const incrementDownloadCount = (mongoose, Application) => {
  return (applicationId) => {
    return new Promise((resolve, reject) => {
      Application.update({
        "_id": applicationId
      }, {
        "$inc": {
          "downloadCount": 1
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

const update = (mongoose, Application) => {
  return (applicationId, attrsToUpdate) => {
    return new Promise((resolve, reject) => {
      Application.findOne({
        "_id": applicationId
      }, (error, application) => {
        if (error || application === null) {
          reject(error);
        } else {
          if (attrsToUpdate.name) {
            application.name = attrsToUpdate.name;
          }

          if (attrsToUpdate.description) {
            application.name = attrsToUpdate.description;
          }

          if (attrsToUpdate.featureGraphicLink) {
            application.featureGraphicLink = attrsToUpdate.featureGraphicLink;
          }

          if (attrsToUpdate.iconLink) {
            application.iconLink = attrsToUpdate.iconLink;
          }

          if (attrsToUpdate.categories) {
            application.categories = attrsToUpdate.categories;
          }

          application.save((error, updatedApplication) => {
            if (error) {
              reject(error);
            } else {
              resolve(updatedApplication);
            }
          });
        }
      });
    });
  };
};

const updateScreenshot = (mongoose, Application) => {
  return (applicationId, screenshotNumber, screenshotLink) => {
    return new Promise((resolve, reject) => {
      Application.findOne({
        "_id": applicationId
      }, (error, application) => {
        if (error || application === null) {
          reject(error);
        } else {

          var links = application.screenshot.links;
          if (screenshotNumber > links.length + 1) {
            reject("a screenshot should be provided for each index below the " +
              "number you want to assign");
          } else {
            //set required over traditional [index]=value so mongoose can detect
            //the update, see https://github.com/Automattic/mongoose/issues/1204
            application.screenshot.links.set(screenshotNumber, screenshotLink);
            application.save((error, updatedApplication) => {
              if (error) {
                reject(error);
              } else {
                resolve(updatedApplication);
              }
            });
          }
        }
      });
    });
  };
};

const addVersion = (mongoose, Application) => {
  return (applicationId, versionNumber, versionName, binaryLink) => {
    return new Promise((resolve, reject) => {
      Application.findOneAndUpdate({
        "_id": applicationId
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
        "_id": applicationId
      }, {
        "$push": {
          "reviews": {
            "description": description,
            "stars": stars
          }
        }, "$inc": {
          "ratings.count": 1,
          "ratings.total": stars
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
    return findOne(mongoose, Application)({
      "_id": applicationId,
    }, attrs);
  };
};

const getApplicationsByDeveloperId = (mongoose, Application) => {
  return (developerId, attrs) => {
    return findMany(mongoose, Application)({
      "developer.id": developerId,
      "currentVersion.number": {
        "$gte": 0
      }
    }, attrs);
  };
};

const getApplicationByIdAndDeveloperId = (mongoose, Application) => {
  return (applicationId, developerId, attrs) => {
    return findOne(mongoose, Application)({
      "_id": applicationId,
      "developer.id": developerId
    }, attrs);
  };
};

const getReviews = (mongoose, Application) => {
  return (applicationId) => {
    return findOne(mongoose, Application)({
      "_id": applicationId
    }).then((application) => {
      if (application === null) {
        return Promise.reject({
          "code": 404,
          "message": "Application not found"
        });
      } else {
        return Promise.resolve(application.reviews);
      }
    });
  };
};

const searchByCategory = (mongoose, Application) => {
  return (category, sortBy, sortDirection, page) => {
    var sort = {};
    sort[sortBy] = sortDirection;
    return findMany(mongoose, Application)({
      "categories": category,
      "currentVersion.number": {
        "$gte": 0
      },
    }, DEFAULT_ATTRS, sort, APPS_PER_PAGE, (page - 1) * APPS_PER_PAGE);
  };
};

const searchByKeywords = (mongoose, Application) => {
  return (keywords, page, attrs) => {
    return new Promise((resolve, reject) => {
      Application.find({
        "currentVersion.number": {
          "$gte": 0
        }, "$text": {
          "$search": keywords
        }
      }, DEFAULT_ATTRS, {
        "score": {
          "$meta": "textScore"
        },
        "limit": APPS_PER_PAGE,
        "skip": (page - 1) * APPS_PER_PAGE
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
  return (where, attrs, sort, limit, skip) => {
    return new Promise((resolve, reject) => {
      Application.find(where, attrs, {
        "limit": limit,
        "skip": skip,
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
    "createReview": createReview(mongoose, Application),
    "addVersion": addVersion(mongoose, Application),
    "getApplication": getApplication(mongoose, Application),
    "getApplicationsByDeveloperId": getApplicationsByDeveloperId(mongoose, Application),
    "getApplicationByIdAndDeveloperId": getApplicationByIdAndDeveloperId(mongoose, Application),
    "getReviews": getReviews(mongoose, Application),
    "incrementDownloadCount": incrementDownloadCount(mongoose, Application),
    "update": update(mongoose, Application),
    "updateScreenshot": updateScreenshot(mongoose, Application),
    "searchByCategory": searchByCategory(mongoose, Application),
    "searchByKeywords": searchByKeywords(mongoose, Application)
  };
};
