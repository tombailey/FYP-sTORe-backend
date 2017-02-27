/*jshint esversion: 6 */
describe("tests", () => {
  const expect = require("chai").expect;

  const cache = require("../../model/response/cache");

  describe("cache", () => {
    describe("#public", () => {
      describe("#days", () => {
        it("should produce public cache header for 1 day", () => {
          //arrange

          //the number of seconds in a day
          var expected = "public, max-age=86400";

          //act
          var actual = cache.public().days(1);


          //assert
          expect(actual).to.eql(expected);
        });
      });
    });
  });

  describe("cache", () => {
    describe("#public", () => {
      describe("#days", () => {
        it("should produce public cache header for 7 days", () => {
          //arrange

          //the number of seconds in a week
          var expected = "public, max-age=604800";

          //act
          var actual = cache.public().days(7);


          //assert
          expect(actual).to.eql(expected);
        });
      });
    });
  });

  describe("cache", () => {
    describe("#private", () => {
      describe("#days", () => {
        it("should produce private cache header for 1 day", () => {
          //arrange

          //the number of seconds in a day
          var expected = "private, max-age=86400";

          //act
          var actual = cache.private().days(1);


          //assert
          expect(actual).to.eql(expected);
        });
      });
    });
  });describe("cache", () => {
    describe("#private", () => {
      describe("#days", () => {
        it("should produce private cache header for 1 day", () => {
          //arrange

          //the number of seconds in a week
          var expected = "private, max-age=604800";

          //act
          var actual = cache.private().days(7);


          //assert
          expect(actual).to.eql(expected);
        });
      });
    });
  });

});
