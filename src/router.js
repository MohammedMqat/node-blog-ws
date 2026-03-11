const querystring = require(`querystring`);
const fs = require("fs");
const path = require("path");

const postsFilePath = path.join(__dirname, "posts.json");

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
    fs.readFile(filePath, (error, file) => {
      if (error) {
        console.log(error);
        return;
      } else {
        response.writeHead(200, { "Content-Type": "image/png" });
        response.end(file);
      }
    });
  } else if (endpoint === "/public/img/logo2.png") {
    const filePath = path.join(__dirname, "..", "public", "img", "logo2.png");
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
      const convertedData = querystring.parse(allTheData);
      const postData = convertedData.post;
      const postTime = Date.now();

      fs.readFile(postsFilePath, (err, data) => {
        if (err) {
          response.writeHead(500, { Location: "/" });
          response.end(`Server Error: ${err.message}`);
        } else {
          const existingPosts = JSON.parse(data.toString());

          existingPosts[postTime] = postData;

          fs.writeFile(postsFilePath, JSON.stringify(existingPosts), (err) => {
            if (err) {
              response.writeHead(500, { Location: "/" });
              response.end(`Server Error: ${err.message}`);
            }
            response.writeHead(302, { Location: "/" });
            response.end();
          });
        }
      });
      // fs.writeFile() //fs.readFile() //Date.now() //JSON.stringify() //JSON.parse()
      // fs read -> json.parse
      // add convertedata to json
      // json stringify -> fs write file
    });
  } else if (method === "GET" && endpoint === "/posts") {
    fs.readFile(postsFilePath, (error, file) => {
      if (error) {
        console.log(error);
        return;
      } else {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(file);
      }
    });
  } else {
    response.writeHead(404);
    response.end(`${method} ${endpoint} not found`);
  }
};
module.exports = router;
