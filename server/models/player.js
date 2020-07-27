const { uuid } = require("uuidv4");

class User {
  constructor(name) {
    this.id = uuid();
    this.name = name;
    this.isHost = false;
    this.isDealer = false;
    this.isBidding = false;
    this.isPlaying = false;
    this.bid = Infinity;
    this.score = 0;
  }
}

module.exports = User;
