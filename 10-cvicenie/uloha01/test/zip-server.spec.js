const assert = require("assert");
const crypto = require("crypto");
const fs = require("fs");

describe("cvicenie10", function() {

  const myClient = require("../src/zip-client.js");
  const myServer = require("../src/zip-server.js");

  describe("Invalid file", function() {

    it("Path to file must exist", function() {
      assert(myClient("asdsads"), "Path does not exist");
    });

    it("Path needs to be include file, not just directory", function() {
      assert(myClient("C:/Users/Marek/Desktop", "Not a file"));
    });

  });

  describe("Created files are correct", function() {
    const files = ["file.txt", "mojText.txt", "frog.jpg"];
    const path = "C:/Users/Marek/Desktop/serverFiles";

    it("Files are correctly saved", function() {
      files.forEach((fileName) => {
        let fileC = fs.readFileSync(`${__dirname}/${fileName}`);
        let fileS = fs.readFileSync(`${path}/${fileName}`);

        let h1 = crypto.createHash('sha1').update(fileC).digest().toString();
        let h2 = crypto.createHash('sha1').update(fileS).digest().toString();

        assert(h1 == h2);
      })
    })
  });

});
