let fs = require("fs");

let myClient = require("../src/zip-client.js");
let myServer = require("../src/zip-server.js");

const serv = myServer("C:/Users/Marek/Desktop");
myClient("mojText.txt");
myClient("frog.jpg");
myClient("file.txt").on("finish", () => {
  serv.close();
});
