/*jshint esversion: 6 */
describe("tests", () => {
  const expect = require("chai").expect;

  describe("sessionService", () => {
    describe("#create", () => {
      it("should create session for developer with correct id", () => {
        //arrange
        var expectedDeveloperId = 42;

        //act
        var sessionService = require("../../model/service/sessionService")();
        sessionService.create(expectedDeveloperId).then(() => {

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
        var sessionService = require("../../model/service/sessionService")();
        sessionService.create(expectedSession.developer.id).then((session) => {
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
        sessionService.create(42).then(() => {
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
          "findOne": (searchQuery) => {
            expect(searchQuery).to.deep.equal({
              "_id": expectedId
            });
          }
        };

        //act
        var sessionService = require("../../model/service/sessionService")
          (null, mockSession);
        sessionService.getSession(expectedId);

        //assert

      });
    });
  });

  describe("sessionService", () => {
    describe("#getSession", () => {
      it("should get session with correct attributes", () => {
        //arrange
        var mockSession = {
          "findOne": (searchQuery, attrs) => {
            expect(attrs).to.equal("developer.id");
          }
        };

        //act
        var sessionService = require("../../model/service/sessionService")
          (null, mockSession);
        sessionService.getSession(42);

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
        sessionService.getSession(42).then((session) => {
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
        sessionService.getSession(42).then((session) => {
          throw "";
        }).catch((error) => {
          expect(error).to.deep.equal(expectedError);
        });

        //assert

      });
    });
  });

});