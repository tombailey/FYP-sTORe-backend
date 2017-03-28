/*jshint esversion: 6 */
describe("tests", () => {
  const expect = require("chai").expect;

  describe("store", () => {
    describe("#uploadOne", () => {
      it("should attempt a file upload using the correct path", () => {
        //arrange
        var expectedPath = "example/image/42.png";
        var mockGoogleStorage = {
          "file": (path) => {
            return {
              "createWriteStream": () => {
                return {
                  "on": (event, callback) => {
                    if (event == "finish") {
                      callback(path);
                    }
                  }, "end": () => {
                    //ignored
                  }
                };
              }
            };
          }
        };

        //act
        var store = require("../../model/storage/store")(mockGoogleStorage);
        return store.uploadOne(expectedPath, null).then((actualPath) => {
          expect(actualPath).to.equal(expectedPath);
        });

        //assert

      });
    });
  });

  describe("store", () => {
    describe("#uploadOne", () => {
      it("should attempt a file upload using the correct buffer", () => {
        //arrange
        var expectedBuffer = [1,0,1,0,1,0];
        var mockGoogleStorage = {
          "file": () => {
            return {
              "createWriteStream": () => {
                return {
                  "on": (event, callback) => {
                    if (event == "finish") {
                      callback();
                    }
                  }, "end": (actualBuffer) => {
                    expect(actualBuffer).to.eql(expectedBuffer);
                  }
                };
              }
            };
          }
        };

        //act
        var store = require("../../model/storage/store")(mockGoogleStorage);
        return store.uploadOne(null, expectedBuffer).then(() => {

        });

        //assert

      });
    });
  });

  describe("store", () => {
    describe("#uploadOne", () => {
      it("should subscribe for errors when uploading a file", () => {
        //arrange
        var expectedEvent = "error";
        var wasExpectedEventSeen = false;

        var mockGoogleStorage = {
          "file": () => {
            return {
              "createWriteStream": () => {
                return {
                  "on": (actualEvent, callback) => {
                    if (actualEvent == expectedEvent) {
                      wasExpectedEventSeen = true;
                    }

                    if (actualEvent == "finish") {
                      callback();
                    }
                  }, "end": () => {
                    //ignored
                  }
                };
              }
            };
          }
        };

        //act
        var store = require("../../model/storage/store")(mockGoogleStorage);
        return store.uploadOne(null, null).then(() => {
          expect(wasExpectedEventSeen).to.equal(true);
        });

        //assert

      });
    });
  });

  describe("store", () => {
    describe("#uploadOne", () => {
      it("should subscribe for success when uploading a file", () => {
        //arrange
        var expectedEvent = "finish";
        var wasExpectedEventSeen = false;

        var mockGoogleStorage = {
          "file": () => {
            return {
              "createWriteStream": () => {
                return {
                  "on": (actualEvent, callback) => {
                    if (actualEvent == expectedEvent) {
                      wasExpectedEventSeen = true;
                    }

                    if (actualEvent == "finish") {
                      callback();
                    }
                  }, "end": () => {
                    //ignored
                  }
                };
              }
            };
          }
        };

        //act
        var store = require("../../model/storage/store")(mockGoogleStorage);
        return store.uploadOne(null, null).then(() => {
          expect(wasExpectedEventSeen).to.equal(true);
        });

        //assert

      });
    });
  });

  describe("store", () => {
    describe("#makePublic", () => {
      it("should attempt to make a file public using the correct path", () => {
        //arrange
        var expectedPath = "example/image/42.png";
        var mockGoogleStorage = {
          "file": (path) => {
            return {
              "makePublic": () => {
                return {
                  "then": (callback) => {
                    callback(path);
                    return {
                      "catch": () => {
                        //ignored
                      }
                    };
                  }
                };
              }
            };
          }
        };

        //act
        var store = require("../../model/storage/store")(mockGoogleStorage);
        return store.makePublic(expectedPath).then((actualPath) => {
          expect(actualPath).to.eql(expectedPath);
        });

        //assert

      });
    });
  });

  describe("store", () => {
    describe("#makePublic", () => {
      it("should subscribe for errors when making a file public", () => {
        //arrange
        var expectedError = 42;

        var mockGoogleStorage = {
          "file": () => {
            return {
              "makePublic": () => {
                return {
                  "then": () => {
                    return {
                      "catch": (callback) => {
                        callback(expectedError);
                      }
                    };
                  }
                };
              }
            };
          }
        };

        //act
        var store = require("../../model/storage/store")(mockGoogleStorage);
        store.makePublic(null).then(() => {
          throw "catch was not used";
        }).catch((actualError) => {
          expect(actualError).to.equal(expectedError);
        });
      });
    });
  });

  describe("store", () => {
    describe("#makePublic", () => {
      it("should subscribe for success when making a file public", () => {
        //arrange
        var mockGoogleStorage = {
          "file": () => {
            return {
              "makePublic": () => {
                return {
                  "then": (callback) => {
                    callback();
                    return {
                      "catch": () => {
                        //ignored
                      }
                    };
                  }
                };
              }
            };
          }
        };

        //act
        var store = require("../../model/storage/store")(mockGoogleStorage);
        return store.makePublic(null);
      });
    });
  });

  describe("store", () => {
    describe("#uploadOneAndMakePublic", () => {
      it("should attempt a file upload using the correct path", () => {
        //arrange
        var expectedPath = "example/image/42.png";

        var mockGoogleStorage = {
          "file": (actualPath) => {
            expect(actualPath).to.equal(expectedPath);
            return {
              "createWriteStream": () => {
                return {
                  "on": (event, callback) => {
                    if (event == "finish") {
                      callback();
                    }
                  }, "end": () => {
                    //ignored
                  }
                };
              }, "makePublic": () => {
                return {
                  "then": (callback) => {
                    callback();
                    return {
                      "catch": () => {
                        //ignored
                      }
                    };
                  }
                };
              }
            };
          }
        };

        //act
        var store = require("../../model/storage/store")(mockGoogleStorage);
        return store.uploadOneAndMakePublic(expectedPath, null);

        //assert

      });
    });
  });

  describe("store", () => {
    describe("#uploadOneAndMakePublic", () => {
      it("should attempt a file upload using the correct buffer", () => {
        //arrange
        var expectedBuffer = [1,0,1,0,1,0];

        var mockGoogleStorage = {
          "file": () => {
            return {
              "createWriteStream": () => {
                return {
                  "on": (event, callback) => {
                    if (event == "finish") {
                      callback();
                    }
                  }, "end": (actualBuffer) => {
                    expect(actualBuffer).to.eql(expectedBuffer);
                  }
                };
              }, "makePublic": () => {
                return {
                  "then": (callback) => {
                    callback();
                    return {
                      "catch": () => {
                        //ignored
                      }
                    };
                  }
                };
              }
            };
          }
        };

        //act
        var store = require("../../model/storage/store")(mockGoogleStorage);
        return store.uploadOneAndMakePublic(null, expectedBuffer);

        //assert

      });
    });
  });

  describe("store", () => {
    describe("#uploadOneAndMakePublic", () => {
      it("should attempt to make a file public using the correct path", () => {
        //arrange
        var expectedPath = "example/image/42.png";

        var mockGoogleStorage = {
          "file": (actualPath) => {
            expect(actualPath).to.eql(expectedPath);
            return {
              "createWriteStream": () => {
                return {
                  "on": (event, callback) => {
                    if (event == "finish") {
                      callback();
                    }
                  }, "end": () => {
                    //ignored
                  }
                };
              }, "makePublic": () => {
                return {
                  "then": (callback) => {
                    callback(actualPath);
                    return {
                      "catch": () => {
                        //ignored
                      }
                    };
                  }
                };
              }
            };
          }
        };

        //act
        var store = require("../../model/storage/store")(mockGoogleStorage);
        return store.uploadOneAndMakePublic(expectedPath, null);

        //assert

      });
    });
  });

  describe("store", () => {
    describe("#uploadMany", () => {
      it("should attempt 1 file upload given 1 file", () => {
        //arrange
        var uploadsAttempted = 0;

        var mockGoogleStorage = {
          "file": () => {
            return {
              "createWriteStream": () => {
                return {
                  "on": (event, callback) => {
                    if (event == "finish") {
                      callback();
                    }
                  }, "end": () => {
                    uploadsAttempted++;
                  }
                };
              }
            };
          }
        };

        //act
        var store = require("../../model/storage/store")(mockGoogleStorage);
        return store.uploadMany([null], [null]).then(() => {
          //assert
          expect(uploadsAttempted).to.eql(1);
        });
      });
    });
  });

  describe("store", () => {
    describe("#uploadMany", () => {
      it("should attempt 2 file uploads given 2 files", () => {
        //arrange
        var uploadsAttempted = 0;

        var mockGoogleStorage = {
          "file": () => {
            return {
              "createWriteStream": () => {
                return {
                  "on": (event, callback) => {
                    if (event == "finish") {
                      callback();
                    }
                  }, "end": () => {
                    uploadsAttempted++;
                  }
                };
              }
            };
          }
        };

        //act
        var store = require("../../model/storage/store")(mockGoogleStorage);
        return store.uploadMany([null, null], [null, null]).then(() => {
          //assert
          expect(uploadsAttempted).to.equal(2);
        });
      });
    });
  });

  describe("store", () => {
    describe("#uploadMany", () => {
      it("should attempt to upload 1 file using the correct path given 1 file", () => {
        //arrange
        var expectedPaths = ["example/image/42.png"];
        var actualPaths = [];

        var mockGoogleStorage = {
          "file": (path) => {
            return {
              "createWriteStream": () => {
                return {
                  "on": (event, callback) => {
                    if (event == "finish") {
                      callback();
                    }
                  }, "end": () => {
                    //ignored
                  }
                };
              }
            };
          }
        };

        //act
        var store = require("../../model/storage/store")(mockGoogleStorage);
        return store.uploadMany(expectedPaths, [null]).then((actualPaths) => {
          //assert
          expect(actualPaths).to.eql(expectedPaths);
        });
      });
    });
  });

  describe("store", () => {
    describe("#uploadMany", () => {
      it("should attempt to upload 2 files using the correct paths given 2 files", () => {
        //arrange
        var expectedPaths = ["example/image/1.png", "example/image/2.png"];

        var mockGoogleStorage = {
          "file": (path) => {
            return {
              "createWriteStream": () => {
                return {
                  "on": (event, callback) => {
                    if (event == "finish") {
                      callback();
                    }
                  }, "end": () => {
                    //ignored
                  }
                };
              }
            };
          }
        };

        //act
        var store = require("../../model/storage/store")(mockGoogleStorage);
        return store.uploadMany(expectedPaths, [null, null]).then((actualPaths) => {
          //assert
          expect(actualPaths).to.eql(expectedPaths);
        });
      });
    });
  });

  describe("store", () => {
    describe("#uploadMany", () => {
      it("should attempt to upload 1 file using the correct buffer given 1 file", () => {
        //arrange
        var expectedBuffers = [[0,0,0,0,0,0]];
        var actualBuffers = [];

        var mockGoogleStorage = {
          "file": (path) => {
            return {
              "createWriteStream": () => {
                return {
                  "on": (event, callback) => {
                    if (event == "finish") {
                      callback();
                    }
                  }, "end": (actualBuffer) => {
                    actualBuffers.push(actualBuffer);
                  }
                };
              }
            };
          }
        };

        //act
        var store = require("../../model/storage/store")(mockGoogleStorage);
        return store.uploadMany([null], expectedBuffers).then(() => {
          //assert
          expect(actualBuffers).to.eql(expectedBuffers);
        });
      });
    });
  });

  describe("store", () => {
    describe("#uploadMany", () => {
      it("should attempt to upload 2 files using the correct buffers given 2 files", () => {
        //arrange
        var expectedBuffers = [[0,0,0,0,0,0], [1,1,1,1,1,1]];
        var actualBuffers = [];

        var mockGoogleStorage = {
          "file": (path) => {
            return {
              "createWriteStream": () => {
                return {
                  "on": (event, callback) => {
                    if (event == "finish") {
                      callback();
                    }
                  }, "end": (actualBuffer) => {
                    actualBuffers.push(actualBuffer);
                  }
                };
              }
            };
          }
        };

        //act
        var store = require("../../model/storage/store")(mockGoogleStorage);
        return store.uploadMany([null, null], expectedBuffers).then(() => {
          //assert
          expect(actualBuffers).to.eql(expectedBuffers);
        });
      });
    });
  });

  describe("store", () => {
    describe("#uploadManyAndMakePublic", () => {
      it("should attempt a file upload using the correct path given 1 file", () => {
        //arrange
        var expectedPaths = ["example/image/42.png"];

        var mockGoogleStorage = {
          "file": (path) => {
            return {
              "createWriteStream": () => {
                return {
                  "on": (event, callback) => {
                    if (event == "finish") {
                      callback();
                    }
                  }, "end": () => {
                    //ignored
                  }
                };
              }, "makePublic": () => {
                return {
                  "then": (callback) => {
                    callback(path);
                    return {
                      "catch": () => {
                        //ignored
                      }
                    };
                  }
                };
              }
            };
          }
        };

        //act
        var store = require("../../model/storage/store")(mockGoogleStorage);
        return store.uploadManyAndMakePublic(expectedPaths, [null]).then((actualPaths) => {
          //assert
          expect(actualPaths).to.eql(expectedPaths);
        });
      });
    });
  });

  describe("store", () => {
    describe("#uploadManyAndMakePublic", () => {
      it("should attempt file uploads using the correct paths given 2 file", () => {
        //arrange
        var expectedPaths = ["example/image/1.png", "example/image/2.png"];
        var actualPaths = [];

        var mockGoogleStorage = {
          "file": (path) => {
            return {
              "createWriteStream": () => {
                return {
                  "on": (event, callback) => {
                    if (event == "finish") {
                      callback();
                    }
                  }, "end": () => {
                    //ignored
                  }
                };
              }, "makePublic": () => {
                return {
                  "then": (callback) => {
                    callback(path);
                    return {
                      "catch": () => {
                        //ignored
                      }
                    };
                  }
                };
              }
            };
          }
        };

        //act
        var store = require("../../model/storage/store")(mockGoogleStorage);
        return store.uploadManyAndMakePublic(expectedPaths, [null, null]).then((actualPaths) => {
          //assert
          expect(actualPaths).to.eql(expectedPaths);
        });
      });
    });
  });

  describe("store", () => {
    describe("#uploadManyAndMakePublic", () => {
      it("should attempt a file upload using the correct buffer given 1 file", () => {
        //arrange
        var expectedBuffers = [[1,0,1,0,1,0]];
        var actualBuffers = [];

        var mockGoogleStorage = {
          "file": (path) => {
            return {
              "createWriteStream": () => {
                return {
                  "on": (event, callback) => {
                    if (event == "finish") {
                      callback();
                    }
                  }, "end": (actualBuffer) => {
                    actualBuffers.push(actualBuffer);
                  }
                };
              }, "makePublic": () => {
                return {
                  "then": (callback) => {
                    callback(path);
                    return {
                      "catch": () => {
                        //ignored
                      }
                    };
                  }
                };
              }
            };
          }
        };

        //act
        var store = require("../../model/storage/store")(mockGoogleStorage);
        return store.uploadManyAndMakePublic([null], expectedBuffers).then(() => {
          //assert
          expect(actualBuffers).to.eql(expectedBuffers);
        });
      });
    });
  });

  describe("store", () => {
    describe("#uploadManyAndMakePublic", () => {
      it("should attempt file uploads using the correct buffers given 2 files", () => {
        //arrange
        var expectedBuffers = [[0,0,0,0,0,0], [1,1,1,1,1,1]];
        var actualBuffers = [];

        var mockGoogleStorage = {
          "file": (path) => {
            return {
              "createWriteStream": () => {
                return {
                  "on": (event, callback) => {
                    if (event == "finish") {
                      callback();
                    }
                  }, "end": (actualBuffer) => {
                    actualBuffers.push(actualBuffer);
                  }
                };
              }, "makePublic": () => {
                return {
                  "then": (callback) => {
                    callback(path);
                    return {
                      "catch": () => {
                        //ignored
                      }
                    };
                  }
                };
              }
            };
          }
        };

        //act
        var store = require("../../model/storage/store")(mockGoogleStorage);
        return store.uploadManyAndMakePublic([null, null], expectedBuffers).then(() => {
          //assert
          expect(actualBuffers).to.eql(expectedBuffers);
        });
      });
    });
  });

  describe("store", () => {
    describe("#uploadManyAndMakePublic", () => {
      it("should attempt to make a file public using the correct path given 1 file", () => {
        //arrange
        var expectedPaths = ["example/image/42.png"];

        var mockGoogleStorage = {
          "file": (path) => {
            return {
              "createWriteStream": () => {
                return {
                  "on": (event, callback) => {
                    if (event == "finish") {
                      callback();
                    }
                  }, "end": () => {
                    //ignored
                  }
                };
              }, "makePublic": () => {
                return {
                  "then": (callback) => {
                    callback(path);
                    return {
                      "catch": () => {
                        //ignored
                      }
                    };
                  }
                };
              }
            };
          }
        };

        //act
        var store = require("../../model/storage/store")(mockGoogleStorage);
        return store.uploadManyAndMakePublic(expectedPaths, [null]).then((actualPaths) => {
          //assert
          expect(actualPaths).to.eql(expectedPaths);
        });
      });
    });
  });

  describe("store", () => {
    describe("#uploadManyAndMakePublic", () => {
      it("should attempt to make files public using the correct paths given 2 files", () => {
        //arrange
        var expectedPaths = ["example/image/1.png", "example/image/2.png"];

        var mockGoogleStorage = {
          "file": (path) => {
            return {
              "createWriteStream": () => {
                return {
                  "on": (event, callback) => {
                    if (event == "finish") {
                      callback();
                    }
                  }, "end": () => {
                    //ignored
                  }
                };
              }, "makePublic": () => {
                return {
                  "then": (callback) => {
                    callback(path);
                    return {
                      "catch": () => {
                        //ignored
                      }
                    };
                  }
                };
              }
            };
          }
        };

        //act
        var store = require("../../model/storage/store")(mockGoogleStorage);
        return store.uploadManyAndMakePublic(expectedPaths, [null, null]).then((actualPaths) => {
            //assert
            expect(actualPaths.length).to.equal(2);
            expect(actualPaths).to.include(expectedPaths[0]);
            expect(actualPaths).to.include(expectedPaths[1]);
          });
      });
    });
  });

});
