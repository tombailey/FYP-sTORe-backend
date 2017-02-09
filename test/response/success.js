/*jshint esversion: 6 */
describe("tests", () => {
  const expect = require("chai").expect;

  const success = require("../../model/response/success");

  describe("success", () => {
    describe("#created", () => {
      it("should produce 201 status code", () => {
        //arrange
        var mockResponse = {
          "json": () => {

          },
          "status": (code) => {
            expect(code).to.equal(201);
            return mockResponse;
          }
        };
        var data = null;


        //act
        success.created(mockResponse, data);


        //assert

      });
    });
  });

  describe("success", () => {
    describe("#created", () => {
      it("should produce correct json", () => {
        //arrange
        var expectedData = null;
        var mockResponse = {
          "json": (actualData) => {
            expect(actualData).to.deep.equal({
              "data": expectedData
            });
          },
          "status": (code) => {
            return mockResponse;
          }
        };

        //act
        success.created(mockResponse, expectedData);


        //assert

      });
    });
  });

  describe("success", () => {
    describe("#ok", () => {
      it("should produce 200 status code", () => {
        //arrange
        var mockResponse = {
          "json": () => {

          },
          "status": (code) => {
            expect(code).to.equal(200);
            return mockResponse;
          }
        };
        var data = null;


        //act
        success.ok(mockResponse, data);


        //assert

      });
    });
  });

  describe("success", () => {
    describe("#ok", () => {
      it("should produce correct json", () => {
        //arrange
        var expectedData = null;
        var mockResponse = {
          "json": (actualData) => {
            expect(actualData).to.deep.equal({
              "data": expectedData
            });
          },
          "status": (code) => {
            return mockResponse;
          }
        };

        //act
        success.ok(mockResponse, expectedData);


        //assert

      });
    });
  });

});
