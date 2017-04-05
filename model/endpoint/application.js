/*jshint esversion: 6 */
module.exports = (app, upload, mongoose, entities, storageBucket) => {

  const bcrypt = require("bcrypt");

  const error = require("../response/error");
  const success = require("../response/success");

  const cache = require("../response/cache");

  const store = require("../storage/store")(storageBucket);

  const applicationService =
    require("../service/applicationService")(mongoose, entities.Application);
  const sessionService =
    require("../service/sessionService")(mongoose, entities.Session);

  const https = require("https");
  const cacheHeaderOverriddenRequest =
    require("../request/cacheHeaderOverriddenRequest")(https);

  const VALID_SORT_BYS = {
    "downloadcount": "downloadCount",
    "currentversiondate": "currentVersionDate"
  };

  const VALID_SORT_DIRECTIONS = {
    "asc": 1,
    "desc": -1
  };

  const searchByCategory = (req, res, category, page) => {
    var sortBy = req.query.sortBy;
    if (sortBy === undefined) {
      error.badRequest(res, "sortBy is required");
      return;
    } else if (VALID_SORT_BYS[sortBy.toLowerCase()] === undefined) {
      error.badRequest(res, "sortBy is invalid");
      return;
    }

    var sortDirection = req.query.sortDirection;
    if (sortDirection === undefined) {
      error.badRequest(res, "sortDirection is required");
      return;
    } else if (VALID_SORT_DIRECTIONS[sortDirection.toLowerCase()] === undefined) {
      error.badRequest(res, "sortDirection is invalid");
      return;
    }

    applicationService.searchByCategory(category, sortBy, sortDirection, page).then((applications) => {
      success.ok(res, applications, cache.private().hours(1));
    }).catch((err) => {
      console.error(err);
      error.internalServerError(res, "database issue");
    });
  };

  const searchByKeywords = (req, res, keywords, page) => {
    applicationService.searchByKeywords(keywords, page).then((applications) => {
      success.ok(res, applications, cache.private().hours(1));
    }).catch((err) => {
      console.error(err);
      error.internalServerError(res, "database issue");
    });
  };

  const searchByDeveloper = (req, res, developerId, page) => {
    applicationService.getApplicationsByDeveloperId(developerId).then((applications) => {
      success.ok(res, applications, cache.private().hours(1));
    }).catch((err) => {
      console.error(err);
      error.internalServerError(res, "database issue");
    });
  };

  app.get("/api/applications", (req, res) => {
    var page = req.query.page;
    if (page === undefined) {
      error.badRequest(res, "page is required");
      return;
    } else if (isNaN(parseInt(page))) {
      error.badRequest(res, "page should be a number");
      return;
    }

    var category = req.query.category;
    var keywords = req.query.keywords;
    var developerId = req.query.developerId;
    var sessionId = req.query.sessionId;
    if (category !== undefined) {
      searchByCategory(req, res, category.toLowerCase(), page);
    } else if (keywords !== undefined) {
      searchByKeywords(req, res, keywords, page);
    } else if (developerId !== undefined) {
      searchByDeveloper(req, res, developerId, page);
    } else if (sessionId !== undefined) {
      sessionService.getSession(sessionId).then((session) => {
        searchByDeveloper(req, res, session.developer.id, page);
      }).catch((err) => {
        console.error(err);
        if (err.code && err.message) {
          error.error(res, err);
        } else {
          error.internalServerError(res, "internal server error");
        }
      });
    } else {
      error.badRequest(res, "category or keywords is required");
      return;
    }
  });

  app.get("/api/applications/:_appId", (req, res) => {
    var appId = req.params._appId;
    applicationService.getApplication(appId).then((application) => {
      success.ok(res, application, cache.private().hours(1));
    }).catch((err) => {
      console.error(err);
      error.internalServerError(res, "database issue");
    });
  });

  app.post("/api/applications", (req, res) => {
    var sessionId = req.body.sessionId;
    if (sessionId === undefined) {
      error.badRequest(res, "sessionId is required");
      return;
    }

    var packageName = req.body.packageName;
    if (packageName === undefined) {
      error.badRequest(res, "packageName is required");
      return;
    }
    var name = req.body.name;
    if (name === undefined) {
      error.badRequest(res, "name is required");
      return;
    }
    var description = req.body.description;
    if (description === undefined) {
      error.badRequest(res, "description is required");
      return;
    }
    var category = req.body.category;
    if (category === undefined) {
      error.badRequest(res, "category is required");
      return;
    }

    sessionService.getSession(sessionId).then((session) => {
      return applicationService.create(packageName, name, description,
        [category], session.developer.id);
    }).then((newApplication) => {
      success.created(res, {
        "registered": true
      });
    }).catch((err) => {
      console.error(err);
      if (err.code && err.message) {
        error.error(res, err);
      } else {
        error.internalServerError(res, "internal server error");
      }
    });
  });

  app.put("/api/applications/:_appId", (req, res) => {
    var sessionId = req.body.sessionId;
    if (sessionId === undefined) {
      error.badRequest(res, "sessionId is required");
      return;
    }

    var appId = req.params._appId;

    var name = req.body.name;
    var description = req.body.description;

    sessionService.getSession(sessionId).then((session) => {
      return applicationService.getApplicationByIdAndDeveloperId(appId,
        session.developer.id);
    }).then((applicationToBeUpdated) => {
      if (applicationToBeUpdated === null) {
        return Promise.reject({
          "code": 404,
          "message": "application not found"
        });
      } else {

      }
    }).then(() => {
      return applicationService.update(appId, {
        "name": name,
        "description": description
      });
    }).then((newApplication) => {
      success.ok(res, {
        "updated": true
      });
    }).catch((err) => {
      console.error(err);
      if (err.code && err.message) {
        error.error(res, err);
      } else {
        error.internalServerError(res, "internal server error");
      }
    });
  });

  app.get("/api/applications/:_appId/icon", (req, res) => {
    var appId = req.params._appId;

    applicationService.getApplication(appId).then((application) => {
        if (application === null) {
          error.notFound(res, "application doesn't exist");
        } else {
          cacheHeaderOverriddenRequest.overrideRequest(application.iconLink,
            cache.private().days(1), req, res);
        }
      applicationService.incrementDownloadCount(appId);
    }).catch((err) => {
      console.error(err);
      error.internalServerError(res, "database issue");
    });
  });

  const uploadAndUpdate = (req, res, fileName, filePath, attribute) => {
    var appId = req.params._appId;

    var sessionId = req.body.sessionId;
    if (sessionId === undefined) {
      error.badRequest(res, "sessionId is required");
      return;
    }

    var file = req.files[fileName];
    if (file !== undefined) {
      file = file[0];
    }

    sessionService.getSession(sessionId).then((session) => {
      return applicationService.getApplicationByIdAndDeveloperId(appId,
        session.developer.id);
    }).then((applicationToBeUpdated) => {
      if (applicationToBeUpdated === null) {
        return Promise.reject({
          "code": 404,
          "message": "application not found"
        });
      } else {
        return new Promise((resolve, reject) => {
          store.uploadOneAndMakePublic(filePath,
            file.buffer).then((filePath) => {
              resolve("https://storage.googleapis.com/fyp-store-backend-storage/" +
                filePath);
            }).catch((err) => {
              reject(err);
            });
        });
      }
    }).then((fileLink) => {
      var toUpdate = {};
      toUpdate[attribute] = fileLink;
      return applicationService.update(appId, toUpdate);
    }).then((newApplication) => {
      success.ok(res, {
        "updated": true
      });
    }).catch((err) => {
      console.error(err);
      if (err.code && err.message) {
        error.error(res, err);
      } else {
        error.internalServerError(res, "internal server error");
      }
    });
  };

  app.put("/api/applications/:_appId/icon", upload.fields([
    {
      "name": "icon",
      "maxCount": 1
    }
  ]), (req, res) => {
    var appId = req.params._appId;

    uploadAndUpdate(req, res, "icon", "android/images/" + appId + "-icon.png",
      "iconLink");
  });

  app.get("/api/applications/:_appId/featureGraphic", (req, res) => {
    var appId = req.params._appId;

    applicationService.getApplication(appId).then((application) => {
        if (application === null) {
          error.notFound(res, "application not found");
        } else {
          cacheHeaderOverriddenRequest.overrideRequest(
            application.featureGraphicLink, cache.private().days(1), req, res);
        }
      applicationService.incrementDownloadCount(appId);
    }).catch((err) => {
      console.error(err);
      error.internalServerError(res, "database issue");
    });
  });

  app.put("/api/applications/:_appId/featureGraphic", upload.fields([
    {
      "name": "featureGraphic",
      "maxCount": 1
    }
  ]), (req, res) => {
    var appId = req.params._appId;

    uploadAndUpdate(req, res, "featureGraphic",
      "android/images/" + appId + "-featureGraphic.png", "featureGraphicLink");
  });

  app.get("/api/applications/:_appId/screenshots/:_screenshotNumber", (req, res) => {
    var appId = req.params._appId;
    var screenshotNumber = req.params._screenshotNumber;
    if (isNaN(parseInt(screenshotNumber))) {
      error.badRequest(res, "screenshot number is required");
      return;
    } else if (screenshotNumber < 0) {
      error.badRequest(res, "screenshot number should be between 0 and 8");
      return;
    }

    applicationService.getApplication(appId).then((application) => {
      if (application === null) {
        error.notFound(res, "application not found");
      } else {
        var screenshotLinks = application.screenshot.links;
        if (screenshotNumber >= screenshotLinks.length) {
          error.notFound(res, "application screenshot not found");
        } else {
          cacheHeaderOverriddenRequest.overrideRequest(
            screenshotLinks[screenshotNumber], cache.private().days(1), req, res);
        }
        applicationService.incrementDownloadCount(appId);
      }
    }).catch((err) => {
      console.error(err);
      error.internalServerError(res, "database issue");
    });
  });

  const uploadAndUpdateScreenshot = (req, res, screenshotNumber) => {
    var appId = req.params._appId;

    var sessionId = req.body.sessionId;
    if (sessionId === undefined) {
      error.badRequest(res, "sessionId is required");
      return;
    }

    var screenshot = req.files.screenshot;
    if (screenshot !== undefined) {
      screenshot = screenshot[0];
    }

    sessionService.getSession(sessionId).then((session) => {
      return applicationService.getApplicationByIdAndDeveloperId(appId,
        session.developer.id);
    }).then((applicationToBeUpdated) => {
      if (applicationToBeUpdated === null) {
        return Promise.reject({
          "code": 404,
          "message": "application not found"
        });
      } else {
        return new Promise((resolve, reject) => {
          store.uploadOneAndMakePublic(
            "android/images/" + appId + "-screen-" + screenshotNumber + ".png",
            screenshot.buffer).then((screenshotPath) => {
              resolve("https://storage.googleapis.com/fyp-store-backend-storage/" +
                screenshotPath);
            }).catch((err) => {
              reject(err);
            });
        });
      }
    }).then((screenshotLink) => {
      return applicationService.updateScreenshot(appId, screenshotNumber,
        screenshotLink);
    }).then((newApplication) => {
      success.ok(res, {
        "updated": true
      });
    }).catch((err) => {
      console.error(err);
      if (err.code && err.message) {
        error.error(res, err);
      } else {
        error.internalServerError(res, "internal server error");
      }
    });
  };

  app.put("/api/applications/:_appId/screenshots/:_screenshotNumber", upload.fields([
    {
      "name": "screenshot",
      "maxCount": 1
    }
  ]), (req, res) => {
    var appId = req.params._appId;

    var screenshotNumber = parseInt(req.params._screenshotNumber);
    if (isNaN(screenshotNumber)) {
      error.badRequest(res, "screenshot number is required");
      return;
    } else if (screenshotNumber < 0 || screenshotNumber > 8) {
      error.badRequest(res, "screenshot number should be between 0 and 8");
      return;
    }

    uploadAndUpdateScreenshot(req, res, screenshotNumber);
  });

  app.get("/api/applications/:_appId/versions/:_versionNumber", (req, res) => {
    var appId = req.params._appId;
    var versionNumber = req.params._versionNumber;

    applicationService.getApplication(appId).then((application) => {
      return new Promise((resolve, reject) => {
        var binaryLink = null;

        for (var index in application.versions) {
          var version = application.versions[index];
          if (version.number == versionNumber && version.reviewStatus == "accepted") {
            binaryLink = version.binaryLink;
          }
        }

        if (binaryLink === null) {
          reject({
            "code": 404,
            "message": "application version not found"
          });
        } else {
          resolve(binaryLink);
        }
      });
    }).then((binaryLink) => {
      cacheHeaderOverriddenRequest.overrideRequest(binaryLink,
        cache.private().days(30), req, res);

      applicationService.incrementDownloadCount(appId);
    }).catch((err) => {
      console.error(err);
      if (err.code && err.message) {
        error.error(res, err);
      } else {
        error.internalServerError(res, "internal server error");
      }
    });
  });

  app.post("/api/applications/:_appId/versions", upload.fields([
    {
      "name": "binary",
      "maxCount": 1
    }
  ]), (req, res) => {
    var appId = req.params._appId;

    var sessionId = req.body.sessionId;
    if (sessionId === undefined) {
      error.badRequest(res, "sessionId is required");
      return;
    }

    var versionNumber = req.body.versionNumber;
    if (versionNumber === undefined) {
      error.badRequest(res, "versionNumber is required");
      return;
    } else {
      versionNumber = parseInt(versionNumber);
      if (isNaN(versionNumber)) {
        error.badRequest(res, "versionNumber should be a number");
        return;
      }
    }
    var versionName = req.body.versionName;
    if (versionName === undefined) {
      error.badRequest(res, "versionName is required");
      return;
    }

    var binary = req.files.binary[0];
    if (binary === undefined) {
      error.badRequest(res, "binary is required");
      return;
    }

    sessionService.getSession(sessionId).then((session) => {
      return applicationService.getApplicationByIdAndDeveloperId(appId,
        session.developer.id);
    }).then((applicationToBeUpdated) => {
      if (applicationToBeUpdated === null) {
        return Promise.reject({
          "code": 404,
          "message": "application not found"
        });
      } else if (versionNumber <= applicationToBeUpdated.currentVersion.number) {
        return Promise.reject({
          "code": 400,
          "message": "versionNumber should be incremented"
        });
      } else {
        return store.uploadOneAndMakePublic("android/binaries/" + appId +
          "-" + versionNumber + ".apk", binary.buffer);
      }
    }).then((binaryPath) => {
      var binaryLink = "https://storage.googleapis.com/fyp-store-backend-storage/" + binaryPath;
      return applicationService.addVersion(appId, versionNumber, versionName,
        binaryLink);
    }).then((newApplication) => {
      success.created(res, {
        "registered": true
      });
    }).catch((err) => {
      console.error(err);
      if (err.code && err.message) {
        error.error(res, err);
      } else {
        error.internalServerError(res, "internal server error");
      }
    });
  });


  app.get("/api/applications/:_appId/reviews", (req, res) => {
    var appId = req.params._appId;
    applicationService.getReviews(appId).then((reviews) => {
      success.ok(res, reviews);
    }).catch((err) => {
      console.error(err);
      error.internalServerError(res, "database issue");
    });
  });

  app.post("/api/applications/:_appId/reviews", (req, res) => {
    var description = req.body.description;
    if (description === undefined) {
      error.badRequest(res, "description is required");
      return;
    }

    var stars = req.body.stars;
    if (stars === undefined) {
      error.badRequest(res, "stars is required");
      return;
    } else if (isNaN(parseInt(stars))) {
      error.badRequest(res, "stars should be a number");
      return;
    }

    var appId = req.params._appId;
    applicationService.createReview(appId, description, stars).then(() => {
      success.created(res, {
        "registered": true
      });
    }).catch((err) => {
      console.error(err);
      error.internalServerError(res, "database issue");
    });
  });

};
