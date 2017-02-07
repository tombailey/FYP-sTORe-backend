/*jshint esversion: 6 */
describe("tests", () => {
  const expect = require("chai").expect;

  const error = require("../../model/response/error");

  describe("error", () => {
    describe("#badRequest", () => {
      it("should produce 400 error code", () => {
        //arrange
        var mockResponse = {
          "json": () => {

          },
          "status": (code) => {
            expect(code).to.equal(400);
            return mockResponse;
          }
        };
        var message = "bad request";


        //act
        error.badRequest(mockResponse, message);


        //assert

      });
    });
  });

  describe("error", () => {
    describe("#notFound", () => {
      it("should produce 404 error code", () => {
        //arrange
        var mockResponse = {
          "json": () => {

          },
          "status": (code) => {
            expect(code).to.equal(404);
            return mockResponse;
          }
        };
        var message = "not found";


        //act
        error.notFound(mockResponse, message);


        //assert

      });
    });
  });

  describe("error", () => {
    describe("#internalServerError", () => {
      it("should produce 500 error code", () => {
        //arrange
        var mockResponse = {
          "json": () => {

          },
          "status": (code) => {
            expect(code).to.equal(500);
            return mockResponse;
          }
        };
        var message = "internal server error";


        //act
        error.internalServerError(mockResponse, message);


        //assert

      });
    });
  });

});
