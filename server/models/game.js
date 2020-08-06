const Deck = require("./deck");
const Round = require("./round");
const Auction = require("./auction");

class Game {
  constructor(players, nDecks, nHoleCards = 8) {
    this.players = players;
    this.nDecks = nDecks;
    this.nHoleCards = nHoleCards;
    this.nPlayers = Object.keys(players).length;
    this.leadPlayer = this.getPlayersInOrder()[0];
    this.trump = null;
    this.deck = new Deck(nDecks);
    this.cardsPerPlayer = this.getCardsPerPlayer();
    this.cardsNotPlayed = this.deck.cards.length - nHoleCards;
    this.rounds = [];
    this.deck.shuffle();
    this.holeCards = this.deck.dealCards(nHoleCards);
    this.auction = new Auction(players, this.leadPlayer);
    this.startNewRound();
    console.log("new game:", nDecks, nHoleCards, this.cardsPerPlayer);
  }
  getCardsPerPlayer() {
    const { nPlayers, nDecks, nHoleCards } = this;
    const nCards = 54 * nDecks;
    const cardsToRemove = (nCards - nHoleCards) % nPlayers;
    const cardsPerPlayer = (nCards - nHoleCards - cardsToRemove) / nPlayers;
    this.deck.removeCards(cardsToRemove);
    return cardsPerPlayer;
  }
  getPlayersInOrder() {
    return Object.values(this.players).sort((a, b) => a.order - b.order);
  }
  clearPlayerCards() {
    for (const id in this.players) {
      this.players[id].cardsPlayed = [];
    }
  }
  startNewRound() {
    this.clearPlayerCards();
    if (this.rounds.length > 0) {
      this.leadPlayer = this.getCurrentRoundWinner();
    }
    console.log("start new round:", this.leadPlayer);
    const round = new Round(this.players, this.leadPlayer);
    this.rounds.push(round);
  }
  getCurrentRound() {
    return this.rounds[this.rounds.length - 1];
  }
  isCurrentRoundEnd() {
    return this.getCurrentRound().isEnd();
  }
  getCurrentRoundWinner() {
    const playerId = this.getCurrentRound().getWinner();
    const winner = Object.values(this.players).find((p) => p.id === playerId);
    return winner;
  }
  getNextPlayer() {
    if (this.isCurrentRoundEnd()) {
      this.leadPlayer = this.getCurrentRoundWinner();
      this.startNewRound();
    }
    const playerId = this.getCurrentRound().getNextPlayer();
    return this.players[playerId];
  }
  dealCards() {
    return this.deck.dealCards(this.cardsPerPlayer);
  }
  playCards(clientId, cards) {
    this.getCurrentRound().playCards(cards);
    this.players[clientId].cardsPlayed = cards;
  }
  getDealer() {
    return Object.values(this.players).find((p) => p.isDealer);
  }
}

module.exports = Game;
