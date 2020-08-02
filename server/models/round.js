function calculateHandValue(cards) {
  if (!cards || cards.length === 0) return 0;
  const hand = cards.sort((a, b) => b.value - a.value);
  return hand[0].value;
}

class Round {
  constructor(players, leadPlayer) {
    this.players = Object.values(players)
      .sort((a, b) => a.order - b.order)
      .map((p) => p.id);
    this.setLeadPlayer(leadPlayer);
    this.cardsPlayed = [];
    this.pIndex = 0;
  }
  setLeadPlayer(player) {
    while (this.players[0] !== player.id)
      this.players.push(this.players.shift());
  }
  getNextPlayer() {
    return this.players[this.pIndex];
  }
  playCards(cards) {
    this.cardsPlayed[this.pIndex] = cards.sort((a, b) => b.value - a.value);
    this.pIndex += 1;
  }
  isEnd() {
    return this.pIndex >= this.players.length;
  }
  getWinner() {
    let iMax = 0;
    let vMax = 0;
    for (let i = 0; i < this.cardsPlayed.length; i++) {
      const v = calculateHandValue(this.cardsPlayed[i]);
      if (v > vMax) {
        vMax = v;
        iMax = i;
      }
    }
    return this.players[iMax];
  }
}

module.exports = Round;
