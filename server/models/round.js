function calculateHandValue(cards) {
  if (!cards || cards.length === 0) return 0;
  const hand = cards.sort((a, b) => b.value - a.value);
  return hand[0].value;
}

class Round {
  constructor(players, leadPlayer) {
    this.players = players;
    this.playersQueue = Object.values(players)
      .sort((a, b) => a.order - b.order)
      .map((p) => p.id);
    this.setLeadPlayer(leadPlayer);
    this.cardsPlayed = [];
    this.pIndex = 0;
    this.setNextPlayer();
  }
  setLeadPlayer(player) {
    while (this.playersQueue[0] !== player.id)
      this.playersQueue.push(this.playersQueue.shift());
  }
  getNextPlayer() {
    return this.playersQueue[this.pIndex];
  }
  setNextPlayer() {
    for (const clientId in this.players) {
      this.players[clientId].isPlaying = false;
      if (!this.isEnd() && this.players[clientId].id === this.getNextPlayer()) {
        this.players[clientId].isPlaying = true;
      }
    }
  }
  playCards(cards) {
    this.cardsPlayed[this.pIndex] = cards.sort((a, b) => b.value - a.value);
    this.pIndex += 1;
    this.setNextPlayer();
  }
  isEnd() {
    return this.pIndex >= this.playersQueue.length;
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
    return this.playersQueue[iMax];
  }
}

module.exports = Round;
