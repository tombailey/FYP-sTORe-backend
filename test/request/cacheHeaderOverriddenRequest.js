/*jshint esversion: 6 */
describe("tests", () => {
  const expect = require("chai").expect;

  describe("cacheHeaderOverriddenRequest", () => {
    describe("#overrideRequest", () => {
      it("should use correct url", () => {
        //arrange
        var expectedUrl = "https://example.com";

        var mockRequest = {
          "pipe": () => {
            //ignored
          }
        };
        var mockHttps = {
          "request": (url) => {
            expect(url).to.equal(expectedUrl);
            return mockHttps;
          }, "on": () => {
            //ignored
          }
        };

        //act
        var cacheHeaderOverriddenRequest =
          require("../../model/request/cacheHeaderOverriddenRequest")(mockHttps);
        cacheHeaderOverriddenRequest.overrideRequest(expectedUrl, null,
          mockRequest, null);

        //assert

      });
    });
  });

  describe("cacheHeaderOverriddenRequest", () => {
    describe("#overrideRequest", () => {
      it("should set cache-control header", () => {
        //arrange
        var expectedCache = "private, max-age=10";
        var expectedHeaders = {
          "cache-control": expectedCache
        };

        var mockRequest = {
          "pipe": () => {
            //ignored
          }
        };
        var mockResponse = {
          "headers": {},
          "pipe": () => {
            //ignored
          }, "writeHead": (statusCode, headers) => {
            expect(headers).to.deep.equal(expectedHeaders);
          }
        };
        var mockHttps = {
          "request": (url, callback) => {
            callback(mockResponse);
            return mockHttps;
          }, "on": (action, callback) => {
            //ignored
          }
        };

        //act
        var cacheHeaderOverriddenRequest =
          require("../../model/request/cacheHeaderOverriddenRequest")(mockHttps);
        cacheHeaderOverriddenRequest.overrideRequest(null, expectedCache,
          mockRequest, mockResponse);

        //assert

      });
    });
  });

  describe("cacheHeaderOverriddenRequest", () => {
    describe("#overrideRequest", () => {
      it("should set status code according to upstream response", () => {
        //arrange
        var expectedStatusCode = 200;

        var mockRequest = {
          "pipe": () => {
            //ignored
          }
        };
        var mockResponse = {
          "headers": {},
          "statusCode": expectedStatusCode,
          "pipe": () => {
            //ignored
          }, "writeHead": (statusCode) => {
            expect(statusCode).to.deep.equal(expectedStatusCode);
          }
        };
        var mockHttps = {
          "request": (url, callback) => {
            callback(mockResponse);
            return mockHttps;
          }, "on": (action, callback) => {
            //ignored
          }
        };

        //act
        var cacheHeaderOverriddenRequest =
          require("../../model/request/cacheHeaderOverriddenRequest")(mockHttps);
        cacheHeaderOverriddenRequest.overrideRequest(null, null, mockRequest,
          mockResponse);

        //assert

      });
    });
  });

  describe("cacheHeaderOverriddenRequest", () => {
    describe("#overrideRequest", () => {
      it("should produce 500 on upstream error", () => {
        //arrange
        var expectedStatusCode = 500;

        var mockRequest = {
          "pipe": () => {
            //ignored
          }
        };
        var mockResponse = {
          "headers": {},
          "json": () => {
            //ignored
          }, "pipe": () => {
            //ignored
          }, "status": (statusCode) => {
            expect(statusCode).to.equal(expectedStatusCode);
            return mockResponse;
          }
        };
        var mockHttps = {
          "request": (url, callback) => {
            return mockHttps;
          }, "on": (action, callback) => {
            callback(mockResponse);
          }
        };

        //act
        var cacheHeaderOverriddenRequest =
          require("../../model/request/cacheHeaderOverriddenRequest")(mockHttps);
        cacheHeaderOverriddenRequest.overrideRequest(null, null, mockRequest,
          mockResponse);

        //assert

      });
    });
  });

  describe("cacheHeaderOverriddenRequest", () => {
    describe("#overrideRequest", () => {
      it("should produce error json on upstream error", () => {
        //arrange
        var expectedJson = {
          "errors": [{
            "code": 500,
            "message": "file server issue"
          }]
        };

        var mockRequest = {
          "pipe": () => {
            //ignored
          }
        };
        var mockResponse = {
          "headers": {},
          "json": (json) => {
            expect(json).to.deep.equal(expectedJson);
          }, "pipe": () => {
            //ignored
          }, "status": () => {
            return mockResponse;
          }
        };
        var mockHttps = {
          "request": (url, callback) => {
            return mockHttps;
          }, "on": (action, callback) => {
            callback(mockResponse);
          }
        };

        //act
        var cacheHeaderOverriddenRequest =
          require("../../model/request/cacheHeaderOverriddenRequest")(mockHttps);
        cacheHeaderOverriddenRequest.overrideRequest(null, null, mockRequest,
          mockResponse);

        //assert

      });
    });
  });
});
