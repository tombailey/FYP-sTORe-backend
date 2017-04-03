/*jshint esversion: 6 */
describe("tests", () => {
  const expect = require("chai").expect;

  describe("developerService", () => {
    describe("#create", () => {
      it("should create developer with correct attributes", () => {
        //arrange
        var expectedDeveloper = {
          "name": "arthurdent",
          "password": "thanksforallthefish"
        };
        var mockDeveloper = {
          "create": (attrs, callback) => {
            expect(attrs).to.deep.equal(expectedDeveloper);
            callback(undefined, {});
          }
        };

        //act
        var developerService = require("../../model/service/developerService")(null, mockDeveloper);
        return developerService.create(expectedDeveloper.name, expectedDeveloper.password);


        //assert

      });
    });
  });

  describe("developerService", () => {
    describe("#create", () => {
      it("should subscribe for success when creating a developer", () => {
        //arrange
        var expectedDeveloper = {
          "name": "arthurdent",
          "password": "thanksforallthefish"
        };
        var mockDeveloper = {
          "create": (attrs, callback) => {
            expect(attrs).to.deep.equal(expectedDeveloper);
            callback(undefined, expectedDeveloper);
          }
        };

        //act
        var developerService = require("../../model/service/developerService")(null, mockDeveloper);
        return developerService.create(expectedDeveloper.name, expectedDeveloper.password).then((developer) => {
          expect(developer).to.deep.equal(expectedDeveloper);
        });

        //assert

      });
    });
  });

  describe("developerService", () => {
    describe("#create", () => {
      it("should subscribe for errors when creating a developer", () => {
        //arrange
        var expectedError = 42;

        var mockDeveloper = {
          "create": (attrs, callback) => {
            callback(expectedError);
          }
        };

        //act
        var developerService = require("../../model/service/developerService")
          (null, mockDeveloper);
        return developerService.create("arthurdent", "thanksforallthefish").then(() => {
          throw "";
        }).catch((actualError) => {
          expect(actualError).to.equal(expectedError);
        });

        //assert

      });
    });
  });

  describe("developerService", () => {
    describe("#getByName", () => {
      it("should get developer with correct name", () => {
        //arrange
        var expectedName = "arthurdent";

        var mockDeveloper = {
          "findOne": (searchQuery, projection, callback) => {
            expect(searchQuery).to.deep.equal({
              "name": expectedName
            });
            callback();
          }
        };

        //act
        var developerService = require("../../model/service/developerService")
          (null, mockDeveloper);
        return developerService.getByName("arthurdent", "thanksforallthefish");

        //assert

      });
    });
  });

  describe("developerService", () => {
    describe("#getByName", () => {
      it("should make name lowercase when getting a developer", () => {
        //arrange
        var name = "ArthurDent";
        var expectedName = "arthurdent";

        var mockDeveloper = {
          "findOne": (searchQuery, projection, callback) => {
            expect(searchQuery).to.deep.equal({
              "name": expectedName
            });
            callback();
          }
        };

        //act
        var developerService = require("../../model/service/developerService")
          (null, mockDeveloper);
        return developerService.getByName(name, "thanksforallthefish");

        //assert

      });
    });
  });

  describe("developerService", () => {
    describe("#getByName", () => {
      it("sshould subscribe for success when getting a developer", () => {
        //arrange
        var expectedDeveloper = {
          "id": 42,
          "name": "arthurdent",
          "password": "thanksforallthefish"
        };

        var mockDeveloper = {
          "findOne": (searchQuery, projection, callback) => {
            callback(undefined, expectedDeveloper);
          }
        };

        //act
        var developerService = require("../../model/service/developerService")
          (null, mockDeveloper);
        return developerService.getByName(expectedDeveloper.name, expectedDeveloper.password).then((actualDeveloper) => {
          expect(actualDeveloper).to.deep.equal(expectedDeveloper);
        });

        //assert

      });
    });
  });

  describe("developerService", () => {
    describe("#getByName", () => {
      it("should subscribe for errors when getting a developer", () => {
        //arrange
        var expectedError = 42;

        var mockDeveloper = {
          "findOne": (searchQuery, projection, callback) => {
            callback(expectedError);
          }
        };

        //act
        var developerService = require("../../model/service/developerService")
          (null, mockDeveloper);
        return developerService.getByName("arthurdent", "thanksforallthefish").then(() => {
          throw "";
        }).catch((actualError) => {
          expect(actualError).to.equal(expectedError);
        });

        //assert

      });
    });
  });

});
