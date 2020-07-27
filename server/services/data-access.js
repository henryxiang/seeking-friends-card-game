const faker = require("faker");
const Player = require("../models/player");

const players = [];

function init(np = 7) {
  for (let i = 0; i < np; i++) {
    const name = faker.name.firstName();
    players.push(new Player(name));
  }
}

function getAllPlayers() {
  if (players.length == 0) init();
  return players;
}

module.exports = {
  getAllPlayers,
};
