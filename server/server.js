const path = require("path");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const Session = require("./models/session");

const env = process.env.NODE_ENV;
const port = process.env.PORT || 8000;
const publicPath =
  env === "development"
    ? path.join(__dirname, "..", "client", "build")
    : path.join(__dirname, "public");

console.info("ENV: ", env);
console.info("Public Path: ", publicPath);
console.info("Port: ", port);

app.use(express.static(publicPath));
new Session(io);

http.listen(port, function () {
  console.log(`server started on http://localhost:${port}`);
});
