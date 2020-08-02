const _ = require("lodash");
const Card = require("./card");

// const suits = Card.suits;
// const ranks = Card.ranks;

function getSingleDeck() {
  const cards = [new Card("joker", "b"), new Card("joker", "r")];
  for (const s of Card.suits) {
    for (const r of Card.ranks) {
      cards.push(new Card(s, r));
    }
  }
  return cards;
}

class Deck {
  constructor(nDecks = 1) {
    let cards = [];
    for (let i = 0; i < nDecks; i++) cards = [...cards, ...getSingleDeck()];
    this.cards = cards;
    this.dIndex = 0;
  }
  shuffle() {
    console.log("shuffle cards");
    this.cards = _.shuffle(this.cards);
    this.dIndex = 0;
  }
  sort() {
    this.cards = this.cards.sort((a, b) => b.value - a.value);
  }
  removeCards(n) {
    console.log("remove cards:", n);
    this.sort();
    this.cards = _.slice(this.cards, 0, this.cards.length - n);
    console.log("number of cards:", this.cards.length);
  }
  dealCards(n) {
    const cards = _.take(this.cards, n);
    this.cards = _.slice(this.cards, n);
    return cards;
  }
}

module.exports = Deck;
