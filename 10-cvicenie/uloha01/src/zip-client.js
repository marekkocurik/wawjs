let fs = require("fs");
let http = require("http");
let path = require("path");
let { pipeline } = require("stream");

module.exports = myClient;

function myClient(file) {
  let url = "http://localhost:9999";

  if(!fs.existsSync(file)) {
    // console.log("Path does not exist");
    return "Path does not exist";
  } else if(!fs.lstatSync(file).isFile()) {
    // console.log("Not a file");
    return "Not a file";
  }

  let fileName = path.basename(file);

  let input = fs.createReadStream(file);
  let output = fs.createWriteStream(`${file}.gz`);

  let request = http.request(url, {method: "POST"});

  request.setHeader("filename", fileName);

  pipeline(input, request, err => {
    if(err) {
      console.log("Error: failed to pipe input on request; ", err);
    }
  });

  request.on("response", (res) => {
    pipeline(res, output, err => {
      if(err) {
        console.log("Error: failed to pipe res on output; ", err);
        fs.unlinkSync(`${fileName}.gz`);
      }
    })
  });

  return request;
}

myClient(process.argv[2]);
