const querystring = require(`querystring`);
const fs = require("fs");
const path = require("path");
const router = (request, response) => {
  const endpoint = request.url;
  const method = request.method;
  console.log(`${method} ${endpoint}`);
  if (endpoint === "/") {
    const filePath = path.join(__dirname, "..", "public", "index.html");
    fs.readFile(filePath, (error, file) => {
      if (error) {
        console.log(error);
        return;
      } else {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end(file);
      }
    });
  } else if (endpoint === "/public/main.css") {
    const filePath = path.join(__dirname, "..", "public", "main.css");
    fs.readFile(filePath, (error, file) => {
      if (error) {
        console.log(error);
        return;
      } else {
        response.writeHead(200, { "Content-Type": "text/css" });
        response.end(file);
      }
    });
  } else if (endpoint === "/public/script.js") {
    const filePath = path.join(__dirname, "..", "public", "script.js");
    fs.readFile(filePath, (error, file) => {
      if (error) {
        console.log(error);
        return;
      } else {
        response.writeHead(200, { "Content-Type": "application/javascript" });
        response.end(file);
      }
    });
  } else if (endpoint === "/public/favicon.ico") {
    const filePath = path.join(__dirname, "..", "public", "favicon.ico");
    fs.readFile(filePath, (error, file) => {
      if (error) {
        console.log(error);
        return;
      } else {
        // response.writeHead(200, { "Content-Type": "application/javascript" });
        response.end(file);
      }
    });
  } else if (endpoint === "/img/image.jpg") {
    const filePath = path.join(__dirname, "..", "public", "img", "image.jpg");
    console.log(filePath);
    fs.readFile(filePath, (error, file) => {
      if (error) {
        console.log(error);
        return;
      } else {
        response.writeHead(200, { "Content-Type": "image/jpeg" });
        response.end(file);
      }
    });
  } else if (endpoint === "/public/img/logo1.png") {
    const filePath = path.join(__dirname, "..", "public", "img", "logo1.png");
    console.log(filePath);
    fs.readFile(filePath, (error, file) => {
      if (error) {
        console.log(error);
        return;
      } else {
        response.writeHead(200, { "Content-Type": "image/png" });
        response.end(file);
      }
    });
  } else if (method === "POST" && endpoint === "/create-post") {
    let allTheData = "";
    request.on("data", (chunkOfData) => {
      allTheData += chunkOfData;
    });
    request.on(`end`, () => {
      const converteData = querystring.parse(allTheData);
      console.log(converteData);
      response.writeHead(302, { Location: "/" });
      response.end();
    });
  } else {
    response.writeHead(404);
    response.end(`${method} ${endpoint} not found`);
  }
};
module.exports = router;
