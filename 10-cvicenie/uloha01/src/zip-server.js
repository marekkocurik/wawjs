const http = require("http");
const { pipeline } = require("stream");
const zlib = require("zlib");
const fs = require("fs");

module.exports = myServer;

function myServer(directory) {

  if(!fs.existsSync(directory)) {
    console.log("Path does not exist (2)");
    return;
  } else if(!fs.lstatSync(directory).isDirectory()) {
    console.log("Not a directory")
  }

  let server = http.createServer()
  server.listen(9999, "localhost")
    .on(("request"), (req, res) => {
      const fileDir = directory;

      const fileName = req.headers["filename"];

      const write = fs.createWriteStream(`${fileDir}/${fileName}`);

      pipeline(req, write, err => {
        if(err) {
          console.log("Error: failed to pipe req on write; ", err);
        }
      });

      pipeline(req, zlib.createGzip(), res, err => {
        if(err) {
          console.log("Error: creating zip; ", err);
        }
      })
    });
    
    return server;
}
