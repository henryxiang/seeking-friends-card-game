class Auction {
  constructor(players, firstBidder) {
    this.players = players;
    this.bidders = Object.values(players)
      .sort((a, b) => a.order - b.order)
      .map((p) => p.id);
    this.idMap = this.getIdMap();
    this.bIndex = 0;
    while (this.bidders[0].id !== firstBidder.id) this.bIndex += 1;
    this.lowestBid = 100;
    this.currentWinner = null;
    this.offers = {};
    for (const id of this.bidders) this.offers[id] = "";
  }
  getIdMap() {
    const idMap = {};
    for (const clientId of Object.keys(this.players)) {
      const playerId = this.players[clientId].id;
      idMap[playerId] = clientId;
    }
    console.log("id map:", idMap);
    return idMap;
  }
  getCurrentBidderClientId() {
    const playerId = this.bidders[this.bIndex];
    return this.idMap[playerId];
  }
  setNextBidder() {
    let i = (this.bIndex + 1) % this.bidders.length;
    while (this.offers[this.bidders[i]] === "quit")
      i = (i + 1) % this.bidders.length;
    this.bIndex = i;
  }
  isEnd() {
    const quits = Object.values(offers).reduce((acc, cur) => {
      if (cur === "quit") return acc + 1;
      else return acc;
    }, 0);
    return quits === this.bidders.length - 1;
  }
  bid(playerId, offer) {
    this.offers[playerId] = offer;
    if (typeof offer === "number") {
      this.lowestBid = offer;
      this.currentWinner = playerId;
    }
  }
}

module.exports = Auction;
