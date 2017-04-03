/*jshint esversion: 6 */
describe("tests", () => {
  const expect = require("chai").expect;

  describe("applicationService", () => {
    describe("#create", () => {
      it("should create application with correct attributes", () => {
        //arrange
        var expectedApplication = {
          "_id": "com.example",
          "name": "example",
          "description": "this is an example application",
          "featureGraphicLink": null,
          "iconLink": null,
          "screenshots": [],
          "reviews": [],
          "versions": [],
          "categories": ["communication"],
          "developer.id": 42
        };
        var mockApplication = {
          "create": (attrs, callback) => {
            expect(attrs).to.deep.equal(expectedApplication);
            callback(undefined, {});
          }
        };

        //act
        var applicationService = require("../../model/service/applicationService")(null, mockApplication);
        return applicationService.create(expectedApplication._id,
          expectedApplication.name, expectedApplication.description,
          expectedApplication.categories, expectedApplication["developer.id"]).then(() => {

        });


        //assert

      });
    });
  });

  describe("applicationService", () => {
    describe("#create", () => {
      it("should subscribe for success when creating an application", () => {
        //arrange
        var expectedApplication = {
          "_id": "com.example",
          "name": "example",
          "description": "this is an example application",
          "featureGraphicLink": null,
          "iconLink": null,
          "screenshots": [],
          "reviews": [],
          "versions": [],
          "categories": ["communication"],
          "developer.id": 42
        };
        var mockApplication = {
          "create": (attrs, callback) => {
            callback(undefined, expectedApplication);
          }
        };

        //act
        var applicationService = require("../../model/service/applicationService")(null, mockApplication);
        return applicationService.create().then((actualApplication) => {
          expect(actualApplication).to.deep.equal(expectedApplication);
        });


        //assert

      });
    });
  });

  describe("applicationService", () => {
    describe("#create", () => {
      it("should subscribe for errors when creating an application", () => {
        //arrange
        var expectedError =  42;
        var mockApplication = {
          "create": (attrs, callback) => {
            callback(expectedError);
          }
        };

        //act
        var applicationService = require("../../model/service/applicationService")(null, mockApplication);
        return applicationService.create().then(() => {
            throw "then was called";
        }).catch((actualError) => {
          expect(actualError).to.deep.equal(expectedError);
        });


        //assert

      });
    });
  });

  describe("applicationService", () => {
    describe("#getApplication", () => {
      it("should get application using correct id", () => {
        //arrange
        var expectedId = 42;

        var mockApplication = {
          "findOne": (searchQuery, projection, callback) => {
            expect(searchQuery).to.deep.equal({
              "_id": expectedId
            });
            callback(undefined, {});
          }
        };

        //act
        var applicationService = require("../../model/service/applicationService")(null, mockApplication);
        return applicationService.getApplication(expectedId).then(() => {

        });


        //assert

      });
    });
  });

  describe("applicationService", () => {
    describe("#getApplication", () => {
      it("should get application with correct attributes", () => {
        //arrange
        var expectedProjection = "_id name";

        var mockApplication = {
          "findOne": (searchQuery, projection, callback) => {
            expect(projection).to.equal(expectedProjection);
            callback(undefined, {});
          }
        };

        //act
        var applicationService = require("../../model/service/applicationService")(null, mockApplication);
        return applicationService.getApplication(42, expectedProjection).then(() => {

        });

        //assert

      });
    });
  });


  describe("applicationService", () => {
    describe("#getApplication", () => {
      it("should subscribe for success when getting an application", () => {
        //arrange
        var expectedApplication = {
          "_id": "com.example",
          "name": "example",
          "description": "this is an example application",
          "featureGraphicLink": null,
          "iconLink": null,
          "screenshots": [],
          "reviews": [],
          "versions": [],
          "categories": ["communication"],
          "developer.id": 42
        };

        var mockApplication = {
          "findOne": (searchQuery, projection, callback) => {
            callback(undefined, expectedApplication);
          }
        };

        //act
        var applicationService = require("../../model/service/applicationService")(null, mockApplication);
        return applicationService.getApplication(42).then((actualApplication) => {
          expect(actualApplication).to.deep.equal(expectedApplication);
        });

        //assert

      });
    });
  });

  describe("applicationService", () => {
    describe("#getApplication", () => {
      it("should subscribe for success when getting an application", () => {
        //arrange
        var expectedError = 42;

        var mockApplication = {
          "findOne": (searchQuery, projection, callback) => {
            callback(expectedError);
          }
        };

        //act
        var applicationService = require("../../model/service/applicationService")(null, mockApplication);
        return applicationService.getApplication(42).then((actualApplication) => {
          throw "then was called";
        }).catch((actualError) => {
          expect(actualError).to.equal(expectedError);
        });

        //assert

      });
    });
  });

  describe("applicationService", () => {
    describe("#incrementDownloadCount", () => {
      it("should increment download count", () => {
        //arrange
        var expectedUpdateOperation = {
          "$inc": {
            "downloadCount": 1
          }
        };

        var mockApplication = {
          "update": (searchQuery, updateOperation, callback) => {
            expect(updateOperation).to.deep.equal(expectedUpdateOperation);
            callback();
          }
        };

        //act
        var applicationService = require("../../model/service/applicationService")(null, mockApplication);
        return applicationService.incrementDownloadCount(42);

        //assert

      });
    });
  });

  describe("applicationService", () => {
    describe("#incrementDownloadCount", () => {
      it("should increment download count for correct application", () => {
        //arrange
        var expectedId = 42;
        var mockApplication = {
          "update": (searchQuery, updateOperation, callback) => {
            expect(searchQuery).to.deep.equal({
              "_id": expectedId
            });
            callback();
          }
        };

        //act
        var applicationService = require("../../model/service/applicationService")(null, mockApplication);
        return applicationService.incrementDownloadCount(expectedId);

        //assert

      });
    });
  });

  describe("applicationService", () => {
    describe("#incrementDownloadCount", () => {
      it("should subscribe for success when incrementing download count", () => {
        //arrange
        var mockApplication = {
          "update": (searchQuery, projection, callback) => {
            callback();
          }
        };

        //act
        var applicationService = require("../../model/service/applicationService")(null, mockApplication);
        return applicationService.incrementDownloadCount();

        //assert

      });
    });
  });

  describe("applicationService", () => {
    describe("#incrementDownloadCount", () => {
      it("should subscribe for errors when incrementing download count", () => {
        //arrange
        var expectedError = 42;

        var mockApplication = {
          "update": (searchQuery, projection, callback) => {
            callback(expectedError);
          }
        };

        //act
        var applicationService = require("../../model/service/applicationService")(null, mockApplication);
        return applicationService.incrementDownloadCount().then((actualApplication) => {
          throw "then was called";
        }).catch((actualError) => {
          expect(actualError).to.equal(expectedError);
        });

        //assert

      });
    });
  });

});
