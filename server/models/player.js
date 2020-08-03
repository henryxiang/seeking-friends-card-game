const { uuid } = require("uuidv4");

class Player {
  constructor(name, id = null) {
    this.id = id || uuid();
    this.order = 0;
    this.name = name;
    this.isDealer = false;
    this.isBidding = false;
    this.isPlaying = false;
    this.isFriend = false;
    this.bid = Infinity;
    this.score = 0;
    this.cardsPlayed = [];
    this.friendCards = [];
    this.friends = [];
  }
}

module.exports = Player;
