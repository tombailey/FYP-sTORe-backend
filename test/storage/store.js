/*jshint esversion: 6 */
describe("tests", () => {
  const expect = require("chai").expect;

  describe("store", () => {
    describe("#uploadOne", () => {
      it("should attempt a file upload using the correct path", () => {
        //arrange
        var expectedPath = "example/image/42.png";
        var mockGoogleStorage = {
          "file": (actualPath) => {
            expect(actualPath).to.eql(expectedPath);
            return {
              "createWriteStream": () => {
                return {
                  "on": () => {
                    //ignored
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
        store.uploadOne(expectedPath, null).then(() => {
          return;
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
                  "on": () => {
                    //ignored
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
        store.uploadOne(null, expectedBuffer).then(() => {
          return;
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
        var mockGoogleStorage = {
          "file": () => {
            return {
              "createWriteStream": () => {
                return {
                  "on": (actualEvent) => {
                    expect(actualEvent).to.eql(expectedEvent);
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
        store.uploadOne(null, null).then(() => {
          return;
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
        var mockGoogleStorage = {
          "file": () => {
            return {
              "createWriteStream": () => {
                return {
                  "on": (actualEvent) => {
                    expect(actualEvent).to.eql(expectedEvent);
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
        store.uploadOne(null, null).then(() => {
          return;
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
          "file": (actualPath) => {
            expect(actualPath).to.eql(expectedPath);
            return {
              "makePublic": () => {
                return {
                  "then": () => {
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
        store.makePublic(expectedPath).then(() => {
          return;
        });

        //assert

      });
    });
  });

  describe("store", () => {
    describe("#makePublic", () => {
      it("should subscribe for errors when making a file public", () => {
        //arrange
        var wasCatchUsed = false;
        var mockGoogleStorage = {
          "file": () => {
            return {
              "makePublic": () => {
                return {
                  "then": () => {
                    return {
                      "catch": () => {
                        wasCatchUsed = true;
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
          //assert
          expect(wasCatchUsed).to.eql(true);
        });
      });
    });
  });

  describe("store", () => {
    describe("#makePublic", () => {
      it("should subscribe for success when making a file public", () => {
        //arrange
        var wasThenUsed = false;
        var mockGoogleStorage = {
          "file": () => {
            return {
              "makePublic": () => {
                return {
                  "then": () => {
                    wasThenUsed = true;
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
        store.makePublic(null).then(() => {
          //assert
          expect(wasThenUsed).to.eql(true);
        });
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
            expect(actualPath).to.eql(expectedPath);
            return {
              "createWriteStream": () => {
                return {
                  "on": () => {
                    //ignored
                  }, "end": () => {
                    //ignored
                  }
                };
              }, "makePublic": () => {
                return {
                  "then": () => {
                    wasThenUsed = true;
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
        store.uploadOneAndMakePublic(expectedPath, null);

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
                  "on": () => {
                    //ignored
                  }, "end": (actualBuffer) => {
                    expect(actualBuffer).to.eql(expectedBuffer);
                  }
                };
              }, "makePublic": () => {
                return {
                  "then": () => {
                    wasThenUsed = true;
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
        store.uploadOneAndMakePublic(null, expectedBuffer);

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
                  "on": () => {
                    //ignored
                  }, "end": () => {
                    //ignored
                  }
                };
              }, "makePublic": () => {
                return {
                  "then": () => {
                    wasThenUsed = true;
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
        store.uploadOneAndMakePublic(expectedPath, null);

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
                  "on": () => {
                    //ignored
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
        store.uploadMany([null], [null]).then(() => {
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
                  "on": () => {
                    //ignored
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
        store.uploadMany([null, null], [null, null]).then(() => {
          //assert
          expect(uploadsAttempted).to.eql(2);
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
                //remove path from expected path
                actualPaths.push(path);
                return {
                  "on": () => {
                    //ignored
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
        store.uploadMany(expectedPaths, [null]).then(() => {
          //assert
          expect(expectedPaths.length).to.eql(0);
        });
      });
    });
  });

  describe("store", () => {
    describe("#uploadMany", () => {
      it("should attempt to upload 2 files using the correct paths given 2 files", () => {
        //arrange
        var expectedPaths = ["example/image/1.png", "example/image/2.png"];
        var actualPaths = [];

        var mockGoogleStorage = {
          "file": (path) => {
            return {
              "createWriteStream": () => {
                //remove path from expected path
                actualPaths.push(path);
                return {
                  "on": () => {
                    //ignored
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
        store.uploadMany(expectedPaths, [null, null]).then(() => {
          //assert
          expect(actualPaths).to.eqlual(expectedPaths);
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
                  "on": () => {
                    //ignored
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
        store.uploadMany([null], expectedBuffers).then(() => {
          //assert
          expect(actualBuffers).to.equal(expectedBuffers);
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
                  "on": () => {
                    //ignored
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
        store.uploadMany([null, null], expectedBuffers).then(() => {
          //assert
          expect(actualBuffers).to.equal(expectedBuffers);
        });
      });
    });
  });

  describe("store", () => {
    describe("#uploadManyAndMakePublic", () => {
      it("should attempt a file upload using the correct path given 1 file", () => {
        //arrange
        var expectedPaths = ["example/image/42.png"];
        var actualPaths = [];

        var mockGoogleStorage = {
          "file": (path) => {
            actualPaths.push(path);
            return {
              "createWriteStream": () => {
                return {
                  "on": () => {
                    //ignored
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
        store.uploadMany(expectedPaths, [null]).then(() => {
          //assert
          expect(actualPaths).to.equal(expectedPaths);
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
            actualPaths.push(path);
            return {
              "createWriteStream": () => {
                return {
                  "on": () => {
                    //ignored
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
        store.uploadMany(expectedPaths, [null, null]).then(() => {
          //assert
          expect(actualPaths).to.equal(expectedPaths);
        });
      });
    });
  });

  describe("store", () => {
    describe("#uploadManyAndMakePublic", () => {
      it("should attempt a file upload using the correct buffer given 1 file", () => {
        //arrange
        var expetedBuffers = [[1,0,1,0,1,0]];
        var actualBuffers = [];

        var mockGoogleStorage = {
          "file": (path) => {
            return {
              "createWriteStream": () => {
                return {
                  "on": () => {
                    //ignored
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
        store.uploadMany([null], expetedBuffers).then(() => {
          //assert
          expect(actualBuffers).to.equal(expetedBuffers);
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
                  "on": () => {
                    //ignored
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
        store.uploadMany([null, null], expectedBuffers).then(() => {
          //assert
          expect(actualBuffers).to.equal(expectedBuffers);
        });
      });
    });
  });

  describe("store", () => {
    describe("#uploadManyAndMakePublic", () => {
      it("should attempt to make a file public using the correct path given 1 file", () => {
        //arrange
        var expectedPaths = ["example/image/42.png"];
        var actualPaths = [];

        var mockGoogleStorage = {
          "file": (path) => {
            actualPaths.push(path);
            return {
              "createWriteStream": () => {
                return {
                  "on": () => {
                    //ignored
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
        store.uploadMany(expectedPaths, [null]).then(() => {
          //assert
          expect(actualPaths).to.equal(expectedPaths);
        });
      });
    });
  });

  describe("store", () => {
    describe("#uploadManyAndMakePublic", () => {
      it("should attempt to make files public using the correct paths given 2 files", () => {
        //arrange
        var expectedPaths = ["example/image/1.png", "example/image/2.png"];
        var actualPaths = [];

        var mockGoogleStorage = {
          "file": (path) => {
            actualPaths.push(path);
            return {
              "createWriteStream": () => {
                return {
                  "on": () => {
                    //ignored
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
        store.uploadMany(expectedPaths, [null, null]).then(() => {
          //assert
          expect(actualPaths).to.equal(expectedPaths);
        });
      });
    });
  });

});
