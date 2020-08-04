class Auction {
  constructor(players, firstBidder, minBid = 100, delta = 5) {
    this.players = players;
    this.idMap = this.getIdMap();
    this.minBid = minBid;
    this.delta = delta;
    this.lastBidder = null;
    this.bidders = Object.values(players).sort((a, b) => a.order - b.order);
    this.bIndex = 0;
    while (this.bidders[0].id !== firstBidder.id) this.bIndex += 1;
    this.offers = {};
    for (const playerId of this.bidders) this.offers[playerId] = "";
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
    let i = this.bIndex + 1;
    while (this.offers[this.bidders[i]] === "quit")
      i = (i + 1) % this.bidders.length;
    this.bIndex = i;
    return this.getCurrentBidder();
  }
  bid(playerId, offer) {
    if (offer >= this.minBid)
      throw new Error(`Offer ${offer} is greater than minimum ${this.minBid}.`);
    this.offers[playerId] = offer;
    if (typeof offer === "number") {
      this.minBid = offer - this.delta;
      this.lastBidder = playerId;
    }
  }
  isEnd() {
    const quits = Object.values(this.offers).reduce((acc, cur) => {
      if (cur === "quit") return acc + 1;
      else return acc;
    }, 0);
    return quits === this.bidders.length;
  }
  getAuctionWinner() {
    if (!this.isEnd()) throw new Error("Auction is not end yet.");
    const player = this.getPlayerById(this.lastBidder);
    return player;
  }
}
