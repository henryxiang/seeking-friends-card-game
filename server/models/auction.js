const _ = require("lodash");

class Auction {
  constructor(players, firstBidder, minBid = 100, delta = 5) {
    this.players = players;
    this.idMap = this.getIdMap();
    this.minBid = minBid;
    this.delta = delta;
    this.lastBidder = null;
    this.quits = 0;
    this.bidders = Object.values(players)
      .sort((a, b) => a.order - b.order)
      .map((p) => p.id);
    this.bIndex = _.findIndex(this.bidders, (id) => id === firstBidder.id);
    this.offers = {};
    for (const playerId of this.bidders) this.offers[playerId] = "";
    console.log("auction:", this.bidders, this.bIndex, this.minBid);
  }
  start() {
    for (const player of Object.values(this.players)) {
      player.isBidding = true;
      player.isPlaying = false;
      player.isDealer = false;
    }
  }
  stop() {
    const winner = this.getAuctionWinner();
    for (const player of Object.values(this.players)) {
      player.isBidding = false;
      if (player.id === winner.id) player.isDealer = true;
    }
  }
  getIdMap() {
    const idMap = {};
    for (const clientId in this.players) {
      idMap[this.players[clientId].id] = clientId;
    }
    return idMap;
  }
  getPlayerById(playerId) {
    const clientId = this.idMap[playerId];
    return this.players[clientId];
  }
  getCurrentBidder() {
    const playerId = this.bidders[this.bIndex];
    return this.getPlayerById(playerId);
  }
  getNextBidder() {
    if (this.bIndex >= this.bidders.length) return null;
    let i = (this.bIndex + 1) % this.bidders.length;
    while (this.offers[this.bidders[i]] === "quit")
      i = (i + 1) % this.bidders.length;
    this.bIndex = i;
    console.log("next bidder:", this.bIndex, this.bidders[i]);
    return this.getCurrentBidder();
  }
  bid(playerId, offer) {
    console.log("auction:bid", playerId, offer);
    this.offers[playerId] = offer;
    this.getPlayerById(playerId).bid = offer;
    if (offer !== "quit") {
      this.minBid = offer - this.delta;
      this.lastBidder = playerId;
      console.log("new bid:", this.minBid);
    } else {
      this.quits += 1;
    }
  }
  isEnd() {
    console.log("is end?", this.minBid, this.quits);
    return this.minBid < 0 || this.quits === this.bidders.length - 1;
  }
  getAuctionWinner() {
    if (!this.isEnd()) throw new Error("Auction is not end yet.");
    const player = this.getPlayerById(this.lastBidder);
    return player;
  }
}

module.exports = Auction;
