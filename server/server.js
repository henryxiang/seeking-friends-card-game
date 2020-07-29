const path = require("path");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const dao = require("./services/data-access");

const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function (socket) {
  console.log("socket connected: ", socket.connected);
  socket.on("chat message", processChatMessage);
  socket.on("game", processGameMessage);
});

function processChatMessage(msg) {
  console.log(">>> incoming message:", msg);
  io.emit("chat message", msg);
}

function processGameMessage(msg) {
  const data = JSON.parse(msg);
  console.log(">>> incoming data:\n", data);
  // const response = dao.getAllPlayers();
  io.emit("game", data);
}

http.listen(port, function () {
  console.log("listening on *:" + port);
});
