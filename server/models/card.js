const { uuid } = require("uuidv4");

const suits = ["club", "diamond", "heart", "spade"];
const ranks = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "j",
  "q",
  "k",
  "a",
];

class Card {
  static suits = suits;
  static ranks = ranks;
  constructor(suit, rank) {
    this.id = uuid();
    this.suit = suit;
    this.rank = rank;
    let value = 0;
    if (suit === "joker" && rank === "r") {
      value = 1000;
    } else if (suit === "joker" && rank === "b") {
      value = 800;
    } else {
      value = 100 * (suits.indexOf(suit) + 1) + (ranks.indexOf(rank) + 1);
    }
    this.value = value;
  }
}

module.exports = Card;
