import uuid from "uuid/v4";
import faker from "faker";

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
let cards = [];
let players = [];

export class Player {
  constructor(name) {
    this.id = uuid();
    this.name = name;
    this.isHost = false;
    this.isDealer = false;
    this.isPlaying = false;
    this.isBidding = false;
    this.bid = Infinity;
    this.score = 0;
  }
}

export const getPlayers = (n = 8) => {
  if (!players || players.length == 0) {
    for (let i = 0; i < n; i++) {
      const name = faker.name.firstName();
      players.push(new Player(name));
    }
  }
  return players;
};

export const getLocalPlayer = () => {
  return players[0];
};
export class Card {
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

const swap = (arr, i, j) => {
  const t = arr[i];
  arr[i] = arr[j];
  arr[j] = t;
};

const shuffle = (cards) => {
  for (let i = cards.length; i > 1; i--) {
    const j = Math.floor(Math.random() * i);
    swap(cards, i, j);
  }
};

export const getDeck = () => {
  const cards = [new Card("joker", "b"), new Card("joker", "r")];
  for (const s of suits) {
    for (const r of ranks) {
      cards.push(new Card(s, r));
    }
  }
  return cards;
};

export const resetCards = (decks = 1) => {
  for (let i = 0; i < decks; i++) cards = [...cards, ...getDeck()];
  shuffle(cards);
};

export const dealCards = (n = 54, decks = 1) => {
  if (!cards || cards.length < n) resetCards(decks);
  const hand = [];
  for (let i = 0; i < n; i++) {
    hand.push(cards.pop());
  }
  return hand;
};
