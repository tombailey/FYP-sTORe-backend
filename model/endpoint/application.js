/*jshint esversion: 6 */
module.exports = (app, mongoose, entities) => {

  const error = require("../response/error");
  const success = require("../response/success");

  const applicationService =
    require("../service/applicationService")(mongoose, entities.Application);

    const VALID_SORT_BYS = {
      "downloadcount": "downloadCount",
      "currentversiondate": "currentVersionDate"
    };

    const VALID_SORT_DIRECTIONS = {
      "asc": 1,
      "desc": -1
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
    if (category !== undefined) {
      searchByCategory(req, res, category, page);
    } else if (keywords !== undefined) {
      searchByKeywords(req, res, keywords, page);
    } else {
      error.badRequest(res, "category or keywords is required");
      return;
    }
  });

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
      success.ok(res, applications);
    }).catch((err) => {
      console.error(err);
      error.internalServerError(res, "database issue");
    });
  };

  const searchByKeywords = (req, res, keywords, page) => {
    applicationService.searchByKeywords(keywords, page).then((applications) => {
      success.ok(res, applications);
    }).catch((err) => {
      console.error(err);
      error.internalServerError(res, "database issue");
    });
  };

  app.get("/api/applications/:_appId", (req, res) => {
    var appId = req.params._appId;
    applicationService.getApplication(appId).then((application) => {
      success.ok(res, application);
    }).catch((err) => {
      console.error(eer);
      error.internalServerError(res, "database issue");
    });
  });

  app.get("/api/applications/:_appId/reviews", (req, res) => {
    var appId = req.params._appId;
    applicationService.getReviewsFor(appId).then((reviews) => {
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
    applicationService.createReview(appId, descriptions, stars);
  });

};
