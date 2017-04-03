/*jshint esversion: 6 */
describe("tests", () => {
  const expect = require("chai").expect;

  describe("sessionService", () => {
    describe("#create", () => {
      it("should create session for developer with correct id", () => {
        //arrange
        var expectedDeveloperId = 42;
        var mockSession = {
          "create": (attrs, callback) => {
            expect(attrs.developer.id).to.equal(expectedDeveloperId);
            callback(undefined, {});
          }
        };

        //act
        var sessionService = require("../../model/service/sessionService")(null, mockSession);
        return sessionService.create(expectedDeveloperId).then(() => {

        });


        //assert

      });
    });
  });

  describe("sessionService", () => {
    describe("#create", () => {
      it("should subscribe for success when creating a session", () => {
        //arrange
        var expectedSession = {
          "developer": {
            "id": 42
          }, "validUntil": Date.now()
        };

        var mockSession = {
          "create": (attrs, callback) => {
            callback(undefined, expectedSession);
          }
        };

        //act
        var sessionService = require("../../model/service/sessionService")(null, mockSession);
        return sessionService.create(expectedSession.developer.id).then((session) => {
          expect(session).to.deep.equal(expectedSession);
        });

        //assert

      });
    });
  });

  describe("sessionService", () => {
    describe("#create", () => {
      it("should subscribe for errors when creating a session", () => {
        //arrange
        var expectedError = {
          "example": 42
        };

        var mockSession = {
          "create": (attrs, callback) => {
            callback(expectedError);
          }
        };

        //act
        var sessionService = require("../../model/service/sessionService")
          (null, mockSession);
        return sessionService.create(42).then(() => {
          throw "";
        }).catch((error) => {
          expect(error).to.deep.equal(expectedError);
        });

        //assert

      });
    });
  });

  describe("sessionService", () => {
    describe("#getSession", () => {
      it("should get session using correct id", () => {
        //arrange
        var expectedId = 42;

        var mockSession = {
          "findOne": (searchQuery, projection, callback) => {
            expect(searchQuery).to.deep.equal({
              "_id": expectedId
            });
            callback(undefined, {
              "developer": {
                "id": 1
              }
            });
          }
        };

        //act
        var sessionService = require("../../model/service/sessionService")
          (null, mockSession);
        return sessionService.getSession(expectedId);

        //assert

      });
    });
  });

  describe("sessionService", () => {
    describe("#getSession", () => {
      it("should get session with correct attributes", () => {
        //arrange
        var mockSession = {
          "findOne": (searchQuery, projection, callback) => {
            expect(projection).to.equal("developer.id validUntil");
            callback(undefined, {
              "developer": {
                "id": 1
              }
            });
          }
        };

        //act
        var sessionService = require("../../model/service/sessionService")
          (null, mockSession);
        return sessionService.getSession(42);

        //assert

      });
    });
  });

  describe("sessionService", () => {
    describe("#getSession", () => {
      it("should cause error when session does not exist", () => {
        //arrange
        var mockSession = {
          "findOne": (searchQuery, projection, callback) => {
            callback();
          }
        };

        //act
        var sessionService = require("../../model/service/sessionService")
          (null, mockSession);
        return sessionService.getSession(42).then(() => {
          throw "not expected error";
        }).catch((error) => {
          expect(error).to.deep.equal({
            "code": 401,
            "message": "session does not exist"
          });
        });

        //assert

      });
    });
  });

  describe("sessionService", () => {
    describe("#getSession", () => {
      it("should cause error when session is no longer valid", () => {
        //arrange
        var mockSession = {
          "findOne": (searchQuery, projection, callback) => {
            callback(undefined, {
              "validUntil": 0
            });
          }
        };

        //act
        var sessionService = require("../../model/service/sessionService")
          (null, mockSession);
        return sessionService.getSession(42).then(() => {
          throw "not expected error";
        }).catch((error) => {
          expect(error).to.deep.equal({
            "code": 401,
            "message": "session has expired"
          });
        });

        //assert

      });
    });
  });

  describe("sessionService", () => {
    describe("#getSession", () => {
      it("should subscribe for success when getting a session", () => {
        //arrange
        var expectedSession = {
          "developer": {
            "id": 42
          }
        };

        var mockSession = {
          "findOne": (searchQuery, attrs, callback) => {
            callback(undefined, expectedSession);
          }
        };

        //act
        var sessionService = require("../../model/service/sessionService")
          (null, mockSession);
        return sessionService.getSession(42).then((session) => {
          expect(session).to.deep.equal(expectedSession);
        });

        //assert

      });
    });
  });

  describe("sessionService", () => {
    describe("#getSession", () => {
      it("should subscribe for errors when getting a session", () => {
        //arrange
        var expectedError = {
          "example": 42
        };

        var mockSession = {
          "findOne": (searchQuery, attrs, callback) => {
            callback(expectedError);
          }
        };

        //act
        var sessionService = require("../../model/service/sessionService")
          (null, mockSession);
        return sessionService.getSession(42).then((session) => {
          throw "";
        }).catch((error) => {
          expect(error).to.deep.equal(expectedError);
        });

        //assert

      });
    });
  });

});
