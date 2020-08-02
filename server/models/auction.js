class Auction {
  constructor(players, firstBidder) {
    this.bidders = Object.values(players).sort((a, b) => a.order - b.order);
    while (this.bidders[0].id !== firstBidder.id)
      this.bidders.push(this.bidders.shift());
    this.points = {};
    this.bidders.forEach((b) => (this.points[b.id] = -Infinity));
    this.bIndex = 0;
  }
  getBidder() {}
}
